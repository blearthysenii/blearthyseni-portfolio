import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import {
  ContactCodeLocale,
  hashVerificationCode,
  normalizeContactEmail,
  saveContactVerificationCode,
} from "@/lib/contactCodeVerificationStore";

export const runtime = "nodejs";

type CodeRequestBody = Partial<{
  email: string;
  locale: ContactCodeLocale;
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const codeLifetimeMs = 10 * 60 * 1000;

function getCopy(locale: ContactCodeLocale) {
  return {
    emailRequired:
      locale === "al" ? "Email-i është i detyrueshëm." : "Email is required.",
    invalidEmail:
      locale === "al"
        ? "Shkruaj një email të vlefshëm."
        : "Enter a valid email address.",
    cooldown:
      locale === "al"
        ? "Prit pak para se të dërgosh kod të ri."
        : "Please wait before requesting another code.",
    notConfigured:
      locale === "al"
        ? "Shërbimi i email-it nuk është konfiguruar."
        : "Email service is not configured.",
    failed:
      locale === "al"
        ? "Dërgimi i kodit dështoi."
        : "Failed to send verification code.",
    success:
      locale === "al"
        ? "Kodi i verifikimit u dërgua."
        : "Verification code sent.",
    subject:
      locale === "al"
        ? "Kodi yt i verifikimit"
        : "Your verification code",
    heading:
      locale === "al"
        ? "Kodi yt i verifikimit"
        : "Your verification code",
    intro:
      locale === "al"
        ? "Përdore këtë kod për të vazhduar me dërgimin e mesazhit."
        : "Use this code to continue sending your message.",
    expires:
      locale === "al"
        ? "Kodi skadon pas 10 minutash."
        : "The code expires in 10 minutes.",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CodeRequestBody;
    const locale: ContactCodeLocale = body.locale === "al" ? "al" : "en";
    const copy = getCopy(locale);
    const email = normalizeContactEmail(String(body.email || ""));

    if (!email) {
      return NextResponse.json({ error: copy.emailRequired }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: copy.invalidEmail }, { status: 400 });
    }

    if (
      !process.env.DATABASE_URL ||
      !process.env.RESEND_API_KEY ||
      !process.env.EMAIL_FROM
    ) {
      return NextResponse.json({ error: copy.notConfigured }, { status: 500 });
    }

    const code = randomInt(0, 1000000).toString().padStart(6, "0");
    const expiresAt = new Date(Date.now() + codeLifetimeMs).toISOString();
    const result = await saveContactVerificationCode({
      email,
      codeHash: hashVerificationCode(email, code),
      expiresAt,
      locale,
    });

    if (result.outcome === "cooldown") {
      return NextResponse.json(
        {
          error: copy.cooldown,
          retryAfter: result.retryAfter,
        },
        { status: 429 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: copy.subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;max-width:560px;margin:auto;color:#111111;">
          <h2 style="margin:0 0 10px;font-size:24px;">${copy.heading}</h2>
          <p style="margin:0 0 22px;color:#555555;line-height:1.5;">${copy.intro}</p>
          <div style="font-size:34px;letter-spacing:0.28em;font-weight:800;background:#f6f6f6;border-radius:14px;padding:18px 20px;text-align:center;">
            ${code}
          </div>
          <p style="margin:22px 0 0;color:#777777;line-height:1.5;">${copy.expires}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || copy.failed,
        },
        { status: 500 },
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
