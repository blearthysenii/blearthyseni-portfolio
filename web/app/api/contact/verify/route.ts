import { NextRequest, NextResponse } from "next/server";

import {
  ContactCodeLocale,
  normalizeContactEmail,
  verifyContactCode,
} from "@/lib/contactCodeVerificationStore";

export const runtime = "nodejs";

type VerifyRequestBody = Partial<{
  email: string;
  code: string;
  locale: ContactCodeLocale;
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const codePattern = /^\d{6}$/;

function getCopy(locale: ContactCodeLocale) {
  return {
    emailRequired:
      locale === "al" ? "Email-i është i detyrueshëm." : "Email is required.",
    invalidEmail:
      locale === "al"
        ? "Shkruaj një email të vlefshëm."
        : "Enter a valid email address.",
    codeRequired:
      locale === "al" ? "Kodi është i detyrueshëm." : "Code is required.",
    codeInvalid:
      locale === "al"
        ? "Kodi duhet të ketë 6 numra."
        : "Code must be 6 digits.",
    missing:
      locale === "al"
        ? "Dërgo një kod të ri për këtë email."
        : "Send a new code for this email.",
    expired:
      locale === "al"
        ? "Kodi ka skaduar. Dërgo një kod të ri."
        : "The code expired. Send a new code.",
    locked:
      locale === "al"
        ? "Ke arritur limitin prej 5 tentimeve. Dërgo një kod të ri."
        : "You reached the 5-attempt limit. Send a new code.",
    wrong:
      locale === "al"
        ? "Kodi nuk është i saktë."
        : "The code is not correct.",
    success:
      locale === "al"
        ? "Email-i u verifikua."
        : "Email verified.",
    failed:
      locale === "al"
        ? "Verifikimi dështoi."
        : "Verification failed.",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VerifyRequestBody;
    const locale: ContactCodeLocale = body.locale === "al" ? "al" : "en";
    const copy = getCopy(locale);
    const email = normalizeContactEmail(String(body.email || ""));
    const code = String(body.code || "").trim();

    if (!email) {
      return NextResponse.json({ error: copy.emailRequired }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: copy.invalidEmail }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({ error: copy.codeRequired }, { status: 400 });
    }

    if (!codePattern.test(code)) {
      return NextResponse.json({ error: copy.codeInvalid }, { status: 400 });
    }

    const result = await verifyContactCode(email, code);

    if (result.outcome === "missing") {
      return NextResponse.json({ error: copy.missing }, { status: 404 });
    }

    if (result.outcome === "expired") {
      return NextResponse.json({ error: copy.expired }, { status: 410 });
    }

    if (result.outcome === "locked") {
      return NextResponse.json({ error: copy.locked }, { status: 429 });
    }

    if (result.outcome === "invalid") {
      return NextResponse.json(
        {
          error: `${copy.wrong} ${result.attemptsRemaining}/5`,
          attemptsRemaining: result.attemptsRemaining,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: copy.success,
      },
      { status: 200 },
    );
  } catch {
    const copy = getCopy("en");

    return NextResponse.json(
      {
        success: false,
        error: copy.failed,
      },
      { status: 500 },
    );
  }
}
