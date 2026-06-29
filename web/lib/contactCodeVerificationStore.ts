import { createHmac, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type ContactCodeLocale = "en" | "al";

type ContactCodeRecord = {
  email: string;
  codeHash: string;
  expiresAt: string;
  attempts: number;
  locale: ContactCodeLocale;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  lastSentAt: string;
  verifiedAt?: string;
};

type ContactCodeStore = {
  records: Record<string, ContactCodeRecord>;
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
const storeDirectory = path.join(process.cwd(), ".contact-email-codes");
const storePath = path.join(storeDirectory, "codes.json");

let storeQueue = Promise.resolve();

function withStoreLock<T>(task: () => Promise<T>) {
  const run = storeQueue.then(task, task);
  storeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function getHashSecret() {
  return (
    process.env.CONTACT_CODE_SECRET ||
    process.env.RESEND_API_KEY ||
    "development-contact-code-secret"
  );
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

async function readStore(): Promise<ContactCodeStore> {
  try {
    const file = await readFile(storePath, "utf8");
    const data = JSON.parse(file) as ContactCodeStore;

    return {
      records: data.records || {},
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { records: {} };
    }

    throw error;
  }
}

async function writeStore(store: ContactCodeStore) {
  await mkdir(storeDirectory, { recursive: true });
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function saveContactVerificationCode({
  email,
  codeHash,
  expiresAt,
  locale,
}: {
  email: string;
  codeHash: string;
  expiresAt: string;
  locale: ContactCodeLocale;
}): Promise<SaveResult> {
  return withStoreLock(async () => {
    const store = await readStore();
    const normalizedEmail = normalizeContactEmail(email);
    const existing = store.records[normalizedEmail];
    const now = new Date();

    if (existing) {
      const elapsed = now.getTime() - new Date(existing.lastSentAt).getTime();

      if (elapsed < resendCooldownMs) {
        return {
          outcome: "cooldown",
          retryAfter: Math.ceil((resendCooldownMs - elapsed) / 1000),
        };
      }
    }

    const timestamp = now.toISOString();
    const record: ContactCodeRecord = {
      email: normalizedEmail,
      codeHash,
      expiresAt,
      attempts: 0,
      locale,
      verified: false,
      createdAt: existing?.createdAt || timestamp,
      updatedAt: timestamp,
      lastSentAt: timestamp,
    };

    store.records[normalizedEmail] = record;
    await writeStore(store);

    return { outcome: "saved", record };
  });
}

export async function verifyContactCode(
  email: string,
  code: string,
): Promise<VerifyResult> {
  return withStoreLock(async () => {
    const store = await readStore();
    const normalizedEmail = normalizeContactEmail(email);
    const existing = store.records[normalizedEmail];

    if (!existing) {
      return { outcome: "missing" };
    }

    if (Date.now() > new Date(existing.expiresAt).getTime()) {
      return { outcome: "expired", record: existing };
    }

    if (existing.attempts >= maxAttempts) {
      return { outcome: "locked", record: existing };
    }

    const expectedHash = hashVerificationCode(normalizedEmail, code);

    if (!hashesMatch(existing.codeHash, expectedHash)) {
      const updated: ContactCodeRecord = {
        ...existing,
        attempts: existing.attempts + 1,
        updatedAt: new Date().toISOString(),
      };

      store.records[normalizedEmail] = updated;
      await writeStore(store);

      const attemptsRemaining = Math.max(0, maxAttempts - updated.attempts);

      if (attemptsRemaining === 0) {
        return { outcome: "locked", record: updated };
      }

      return { outcome: "invalid", record: updated, attemptsRemaining };
    }

    const updated: ContactCodeRecord = {
      ...existing,
      verified: true,
      verifiedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.records[normalizedEmail] = updated;
    await writeStore(store);

    return { outcome: "verified", record: updated };
  });
}

export async function consumeVerifiedContactEmail(
  email: string,
  beforeCommit: (record: ContactCodeRecord) => Promise<void>,
): Promise<ConsumeResult> {
  return withStoreLock(async () => {
    const store = await readStore();
    const normalizedEmail = normalizeContactEmail(email);
    const existing = store.records[normalizedEmail];

    if (!existing) {
      return { outcome: "missing" };
    }

    if (!existing.verified) {
      return { outcome: "not-verified", record: existing };
    }

    await beforeCommit(existing);
    delete store.records[normalizedEmail];
    await writeStore(store);

    return { outcome: "consumed", record: existing };
  });
}
