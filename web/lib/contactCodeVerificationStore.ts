import { createHmac, timingSafeEqual } from "crypto";
import { Pool } from "pg";

export type ContactCodeLocale = "en" | "al";

type ContactCodeRow = {
  email: string;
  code_hash: string;
  attempts: number;
  verified: boolean;
  expires_at: Date | string;
  created_at: Date | string;
  last_sent_at: Date | string;
};

type ContactCodeRecord = {
  email: string;
  codeHash: string;
  attempts: number;
  verified: boolean;
  expiresAt: string;
  createdAt: string;
  lastSentAt: string;
};

type SaveResult =
  | { outcome: "cooldown"; retryAfter: number }
  | { outcome: "saved"; record: ContactCodeRecord };

type VerifyResult =
  | { outcome: "missing" }
  | { outcome: "expired"; record: ContactCodeRecord }
  | { outcome: "locked"; record: ContactCodeRecord }
  | { outcome: "invalid"; record: ContactCodeRecord; attemptsRemaining: number }
  | { outcome: "verified"; record: ContactCodeRecord };

type ConsumeResult =
  | { outcome: "missing" }
  | { outcome: "not-verified"; record: ContactCodeRecord }
  | { outcome: "consumed"; record: ContactCodeRecord };

const maxAttempts = 5;
const resendCooldownMs = 60 * 1000;

declare global {
  var contactCodePool: Pool | undefined;
}

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  globalThis.contactCodePool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return globalThis.contactCodePool;
}

let tableReady: Promise<void> | null = null;

async function ensureTable() {
  tableReady ??= getPool()
    .query(`
      CREATE TABLE IF NOT EXISTS contact_verification_codes (
        email TEXT PRIMARY KEY,
        code_hash TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        verified BOOLEAN NOT NULL DEFAULT FALSE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .then(() => undefined);

  return tableReady;
}

function getHashSecret() {
  return (
    process.env.CONTACT_CODE_SECRET ||
    process.env.RESEND_API_KEY ||
    process.env.DATABASE_URL ||
    "development-contact-code-secret"
  );
}

function toIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function mapRow(row: ContactCodeRow): ContactCodeRecord {
  return {
    email: row.email,
    codeHash: row.code_hash,
    attempts: row.attempts,
    verified: row.verified,
    expiresAt: toIso(row.expires_at),
    createdAt: toIso(row.created_at),
    lastSentAt: toIso(row.last_sent_at),
  };
}

export function normalizeContactEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashVerificationCode(email: string, code: string) {
  return createHmac("sha256", getHashSecret())
    .update(`${normalizeContactEmail(email)}:${code}`)
    .digest("hex");
}

function hashesMatch(a: string, b: string) {
  const first = Buffer.from(a, "hex");
  const second = Buffer.from(b, "hex");

  if (first.length !== second.length) {
    return false;
  }

  return timingSafeEqual(first, second);
}

export async function saveContactVerificationCode({
  email,
  codeHash,
  expiresAt,
}: {
  email: string;
  codeHash: string;
  expiresAt: string;
  locale: ContactCodeLocale;
}): Promise<SaveResult> {
  await ensureTable();

  const pool = getPool();
  const normalizedEmail = normalizeContactEmail(email);
  const existingResult = await pool.query<ContactCodeRow>(
    `
      SELECT email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
      FROM contact_verification_codes
      WHERE email = $1
    `,
    [normalizedEmail],
  );
  const existing = existingResult.rows[0];

  if (existing) {
    const elapsed = Date.now() - new Date(existing.last_sent_at).getTime();

    if (elapsed < resendCooldownMs) {
      return {
        outcome: "cooldown",
        retryAfter: Math.ceil((resendCooldownMs - elapsed) / 1000),
      };
    }
  }

  const result = await pool.query<ContactCodeRow>(
    `
      INSERT INTO contact_verification_codes (
        email,
        code_hash,
        attempts,
        verified,
        expires_at,
        created_at,
        last_sent_at
      )
      VALUES ($1, $2, 0, FALSE, $3, NOW(), NOW())
      ON CONFLICT (email)
      DO UPDATE SET
        code_hash = EXCLUDED.code_hash,
        attempts = 0,
        verified = FALSE,
        expires_at = EXCLUDED.expires_at,
        last_sent_at = NOW()
      RETURNING email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
    `,
    [normalizedEmail, codeHash, expiresAt],
  );

  return { outcome: "saved", record: mapRow(result.rows[0]) };
}

export async function verifyContactCode(
  email: string,
  code: string,
): Promise<VerifyResult> {
  await ensureTable();

  const pool = getPool();
  const normalizedEmail = normalizeContactEmail(email);
  const result = await pool.query<ContactCodeRow>(
    `
      SELECT email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
      FROM contact_verification_codes
      WHERE email = $1
    `,
    [normalizedEmail],
  );
  const existing = result.rows[0];

  if (!existing) {
    return { outcome: "missing" };
  }

  const existingRecord = mapRow(existing);

  if (Date.now() > new Date(existing.expires_at).getTime()) {
    await pool.query("DELETE FROM contact_verification_codes WHERE email = $1", [
      normalizedEmail,
    ]);
    return { outcome: "expired", record: existingRecord };
  }

  if (existing.attempts >= maxAttempts) {
    return { outcome: "locked", record: existingRecord };
  }

  const expectedHash = hashVerificationCode(normalizedEmail, code);

  if (!hashesMatch(existing.code_hash, expectedHash)) {
    const updatedResult = await pool.query<ContactCodeRow>(
      `
        UPDATE contact_verification_codes
        SET attempts = attempts + 1
        WHERE email = $1
        RETURNING email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
      `,
      [normalizedEmail],
    );
    const updatedRecord = mapRow(updatedResult.rows[0]);
    const attemptsRemaining = Math.max(0, maxAttempts - updatedRecord.attempts);

    if (attemptsRemaining === 0) {
      return { outcome: "locked", record: updatedRecord };
    }

    return {
      outcome: "invalid",
      record: updatedRecord,
      attemptsRemaining,
    };
  }

  const updatedResult = await pool.query<ContactCodeRow>(
    `
      UPDATE contact_verification_codes
      SET verified = TRUE,
          code_hash = 'verified',
          attempts = 0
      WHERE email = $1
      RETURNING email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
    `,
    [normalizedEmail],
  );

  return { outcome: "verified", record: mapRow(updatedResult.rows[0]) };
}

export async function consumeVerifiedContactEmail(
  email: string,
  beforeCommit: (record: ContactCodeRecord) => Promise<void>,
): Promise<ConsumeResult> {
  await ensureTable();

  const pool = getPool();
  const normalizedEmail = normalizeContactEmail(email);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query<ContactCodeRow>(
      `
        SELECT email, code_hash, attempts, verified, expires_at, created_at, last_sent_at
        FROM contact_verification_codes
        WHERE email = $1
        FOR UPDATE
      `,
      [normalizedEmail],
    );
    const existing = result.rows[0];

    if (!existing) {
      await client.query("ROLLBACK");
      return { outcome: "missing" };
    }

    const record = mapRow(existing);

    if (!existing.verified) {
      await client.query("ROLLBACK");
      return { outcome: "not-verified", record };
    }

    await beforeCommit(record);
    await client.query("DELETE FROM contact_verification_codes WHERE email = $1", [
      normalizedEmail,
    ]);
    await client.query("COMMIT");

    return { outcome: "consumed", record };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
