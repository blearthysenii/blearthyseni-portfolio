import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import {
  ContactCodeLocale,
  consumeVerifiedContactEmail,
  normalizeContactEmail,
} from "@/lib/contactCodeVerificationStore";

export const runtime = "nodejs";

type ContactBody = Partial<{
  name: string;
  email: string;
  message: string;
  locale: ContactCodeLocale;
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCopy(locale: ContactCodeLocale) {
  return {
    required:
      locale === "al"
        ? "Të gjitha fushat janë të detyrueshme."
        : "All fields are required.",
    nameRequired:
      locale === "al" ? "Emri është i detyrueshëm." : "Name is required.",
    messageRequired:
      locale === "al"
        ? "Mesazhi është i detyrueshëm."
        : "Message is required.",
    invalidEmail:
      locale === "al"
        ? "Shkruaj një email të vlefshëm."
        : "Enter a valid email address.",
    notVerified:
      locale === "al"
        ? "Email-i duhet të verifikohet para dërgimit."
        : "Email must be verified before sending.",
    notConfigured:
      locale === "al"
        ? "Shërbimi i email-it nuk është konfiguruar."
        : "Email service is not configured.",
    failed:
      locale === "al"
        ? "Dërgimi i mesazhit dështoi."
        : "Failed to send message.",
    success:
      locale === "al"
        ? "Mesazhi u dërgua me sukses."
        : "Message sent successfully.",
    ownerSubject:
      locale === "al"
        ? "Mesazh i ri nga portfolio"
        : "New Portfolio Contact",
    ownerHeading:
      locale === "al"
        ? "Mesazh i ri nga formulari i kontaktit"
        : "New Contact Form Submission",
    verified:
      locale === "al"
        ? "Email-i i vizitorit u verifikua me kod para dërgimit."
        : "The visitor email was verified with a code before sending.",
    name: locale === "al" ? "Emri" : "Name",
    email: locale === "al" ? "Email-i" : "Email",
    message: locale === "al" ? "Mesazhi" : "Message",
    language: locale === "al" ? "Gjuha" : "Language",
    languageValue: locale === "al" ? "Shqip" : "English",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;
    const locale: ContactCodeLocale = body.locale === "al" ? "al" : "en";
    const copy = getCopy(locale);

    const name = String(body.name || "").trim();
    const email = normalizeContactEmail(String(body.email || ""));
    const message = String(body.message || "").trim();

    if (!email || !name || !message) {
      return NextResponse.json({ error: copy.required }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: copy.invalidEmail }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: copy.nameRequired }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: copy.messageRequired }, { status: 400 });
    }

    if (
      !process.env.DATABASE_URL ||
      !process.env.RESEND_API_KEY ||
      !process.env.EMAIL_FROM ||
      !process.env.EMAIL_TO
    ) {
      return NextResponse.json({ error: copy.notConfigured }, { status: 500 });
    }

    const result = await consumeVerifiedContactEmail(email, async () => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM as string,
        to: process.env.EMAIL_TO as string,
        replyTo: email,
        subject: `${copy.ownerSubject} - ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;max-width:640px;margin:auto;color:#111111;">
            <h2 style="margin:0 0 10px;font-size:24px;">${copy.ownerHeading}</h2>
            <p style="margin:0 0 24px;color:#555555;line-height:1.5;">${copy.verified}</p>

            <div style="border:1px solid #e5e5e5;border-radius:12px;padding:18px;margin-bottom:22px;">
              <p><strong>${copy.name}:</strong> ${escapeHtml(name)}</p>
              <p><strong>${copy.email}:</strong> ${escapeHtml(email)}</p>
              <p><strong>${copy.language}:</strong> ${copy.languageValue}</p>

              <hr style="border:none;border-top:1px solid #e5e5e5;margin:18px 0;" />

              <p style="margin:0 0 8px;"><strong>${copy.message}</strong></p>
              <div style="background:#f6f6f6;padding:16px;border-radius:8px;white-space:pre-wrap;line-height:1.55;">
                ${escapeHtml(message)}
              </div>
            </div>
          </div>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }
    });

    if (result.outcome !== "consumed") {
      return NextResponse.json({ error: copy.notVerified }, { status: 403 });
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
