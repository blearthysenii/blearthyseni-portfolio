"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

import { site } from "../../lib/data/site";

import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type FormStatus = "idle" | "success" | "error";
type FormStep = "email" | "code" | "message";
type FormErrors = Partial<
  Record<"email" | "code" | "name" | "message" | "form", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const codePattern = /^\d{6}$/;

export function Contact({ locale = "en" }: { locale?: "en" | "al" }) {
  const [step, setStep] = useState<FormStep>("email");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const copy = {
    label: locale === "al" ? "KONTAKT" : "CONTACT",
    title: locale === "al" ? "MË KONTAKTO" : "GET IN TOUCH",
    formTitle: locale === "al" ? "Dërgo Mesazh" : "Send Message",
    name: locale === "al" ? "Emri i plotë" : "Full name",
    namePlaceholder: locale === "al" ? "Emri juaj i plotë" : "Your full name",
    email: locale === "al" ? "Email-i" : "Email",
    emailPlaceholder: "name@domain.com",
    code: locale === "al" ? "Kodi" : "Code",
    codePlaceholder: "000000",
    message: locale === "al" ? "Mesazhi" : "Message",
    messagePlaceholder:
      locale === "al" ? "Shkruaj Mesazhin Tënd" : "Type Your Message",
    sendCode: locale === "al" ? "Dërgo kodin" : "Send code",
    verifyCode: locale === "al" ? "Verifiko kodin" : "Verify code",
    resendCode: locale === "al" ? "Dërgo kod të ri" : "Send new code",
    sendMessage: locale === "al" ? "Dërgo mesazhin" : "Send message",
    sending: locale === "al" ? "Duke dërguar..." : "Sending...",
    verifying: locale === "al" ? "Duke verifikuar..." : "Verifying...",
    codeSent:
      locale === "al"
        ? "Të dërguam një kod verifikimi në email. Shkruaje kodin për të vazhduar."
        : "We sent a verification code to your email. Enter the code to continue.",
    success:
      locale === "al"
        ? "Mesazhi u dërgua me sukses."
        : "Message sent successfully.",
    error:
      locale === "al"
        ? "Diçka shkoi keq. Provo përsëri."
        : "Something went wrong. Please try again.",
    verified:
      locale === "al"
        ? "Email-i u verifikua. Plotëso mesazhin."
        : "Email verified. Complete your message.",
    errors: {
      emailRequired:
        locale === "al" ? "Email-i është i detyrueshëm." : "Email is required.",
      emailInvalid:
        locale === "al"
          ? "Shkruaj një email të vlefshëm."
          : "Enter a valid email address.",
      codeRequired:
        locale === "al" ? "Kodi është i detyrueshëm." : "Code is required.",
      codeInvalid:
        locale === "al"
          ? "Kodi duhet të ketë 6 numra."
          : "Code must be 6 digits.",
      nameRequired:
        locale === "al" ? "Emri është i detyrueshëm." : "Name is required.",
      messageRequired:
        locale === "al"
          ? "Mesazhi është i detyrueshëm."
          : "Message is required.",
    },
    phone: "+383 49 539 366",
  };

  const contactRows = [
    {
      icon: Mail,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: Phone,
      value: copy.phone,
      href: "tel:+38349539366",
    },
    {
      icon: MapPin,
      value: site.location,
      href: null,
    },
  ];

  function readError(responseBody: unknown, fallback: string) {
    if (
      responseBody &&
      typeof responseBody === "object" &&
      "error" in responseBody &&
      typeof responseBody.error === "string"
    ) {
      return responseBody.error;
    }

    return fallback;
  }

  function validateEmail() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return copy.errors.emailRequired;
    }

    if (!emailPattern.test(trimmedEmail)) {
      return copy.errors.emailInvalid;
    }

    return null;
  }

  async function sendCode() {
    const emailError = validateEmail();

    if (emailError) {
      setErrors({ email: emailError });
      setStatus("idle");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("idle");
      setErrors({});

      const response = await fetch("/api/contact/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          locale,
        }),
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readError(responseBody, copy.error));
      }

      setCode("");
      setStep("code");
    } catch (error) {
      setStatus("error");
      setErrors({
        email: error instanceof Error ? error.message : copy.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function verifyCode() {
    const emailError = validateEmail();
    const trimmedCode = code.trim();

    if (emailError) {
      setErrors({ email: emailError });
      setStatus("idle");
      return;
    }

    if (!trimmedCode) {
      setErrors({ code: copy.errors.codeRequired });
      setStatus("idle");
      return;
    }

    if (!codePattern.test(trimmedCode)) {
      setErrors({ code: copy.errors.codeInvalid });
      setStatus("idle");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("idle");
      setErrors({});

      const response = await fetch("/api/contact/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: trimmedCode,
          locale,
        }),
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readError(responseBody, copy.error));
      }

      setCode("");
      setStep("message");
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrors({
        code: error instanceof Error ? error.message : copy.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function sendMessage() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = copy.errors.nameRequired;
    }

    if (!message.trim()) {
      nextErrors.message = copy.errors.messageRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("idle");
      setErrors({});

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          message: message.trim(),
          locale,
        }),
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readError(responseBody, copy.error));
      }

      setEmail("");
      setCode("");
      setName("");
      setMessage("");
      setStep("email");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors({
        form: error instanceof Error ? error.message : copy.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === "email") {
      await sendCode();
      return;
    }

    if (step === "code") {
      await verifyCode();
      return;
    }

    await sendMessage();
  }

  const buttonText =
    step === "email"
      ? copy.sendCode
      : step === "code"
        ? copy.verifyCode
        : copy.sendMessage;
  const loadingText = step === "code" ? copy.verifying : copy.sending;

  return (
    <Section
      id={locale === "al" ? "kontakti" : "contact"}
      className="border-t border-white/10 bg-[#050607]"
    >
      <Container>
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
            <div className="pt-1">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-300">
                <span className="h-1.5 w-1.5 bg-white" />
                {copy.label}
              </p>

              <h2 className="mt-4 max-w-[34rem] text-[4.15rem] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white sm:text-[5.4rem] lg:text-[5.15rem] xl:text-[6.1rem]">
                {copy.title}
              </h2>

              <div className="mt-12 max-w-[34rem]">
                {contactRows.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <span className="flex items-center gap-4 py-6 text-base text-neutral-200">
                      <Icon className="h-[18px] w-[18px] shrink-0 text-neutral-300" />
                      <span>{item.value}</span>
                    </span>
                  );

                  return item.href ? (
                    <a
                      key={item.value}
                      href={item.href}
                      className="block border-b border-white/12 transition hover:text-white"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.value} className="border-b border-white/12">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative rounded-md border border-white/[0.08] bg-[#151515] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] lg:mt-2"
              noValidate
            >
              <h3 className="text-lg font-medium text-white">{copy.formTitle}</h3>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">
                    {copy.email}
                  </span>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    readOnly={step === "message"}
                    placeholder={copy.emailPlaceholder}
                    className="h-10 w-full rounded-[3px] border border-transparent bg-[#252525] px-3 text-[16px] text-white outline-none placeholder:text-neutral-500 focus:border-white/20 read-only:text-neutral-300"
                  />
                  {errors.email && (
                    <span className="mt-2 block text-xs text-red-400">
                      {errors.email}
                    </span>
                  )}
                </label>

                <AnimatePresence initial={false}>
                  {step === "code" && (
                    <motion.div
                      key="code-step"
                      initial={{ height: 0, opacity: 0, y: -6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -6 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mb-3 text-sm leading-6 text-neutral-400">
                        {copy.codeSent}
                      </p>
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-white">
                          {copy.code}
                        </span>
                        <input
                          value={code}
                          onChange={(event) =>
                            setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          placeholder={copy.codePlaceholder}
                          className="h-10 w-full rounded-[3px] border border-transparent bg-[#252525] px-3 text-center text-[16px] tracking-[0.32em] text-white outline-none placeholder:text-neutral-600 focus:border-white/20"
                        />
                        {errors.code && (
                          <span className="mt-2 block text-xs text-red-400">
                            {errors.code}
                          </span>
                        )}
                      </label>
                      <button
                        type="button"
                        onClick={sendCode}
                        disabled={isSubmitting}
                        className="mt-3 text-xs font-medium text-neutral-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {copy.resendCode}
                      </button>
                    </motion.div>
                  )}

                  {step === "message" && (
                    <motion.div
                      key="message-step"
                      initial={{ height: 0, opacity: 0, y: -6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -6 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mb-3 text-sm leading-6 text-emerald-400">
                        {copy.verified}
                      </p>
                      <div className="space-y-3">
                        <label className="block">
                          <span className="mb-2 block text-sm font-medium text-white">
                            {copy.name}
                          </span>
                          <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            placeholder={copy.namePlaceholder}
                            className="h-10 w-full rounded-[3px] border border-transparent bg-[#252525] px-3 text-[16px] text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                          />
                          {errors.name && (
                            <span className="mt-2 block text-xs text-red-400">
                              {errors.name}
                            </span>
                          )}
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-medium text-white">
                            {copy.message}
                          </span>
                          <textarea
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={8}
                            placeholder={copy.messagePlaceholder}
                            className="min-h-[176px] w-full resize-y rounded-[3px] border border-transparent bg-[#252525] px-3 py-3 text-[16px] text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                          />
                          {errors.message && (
                            <span className="mt-2 block text-xs text-red-400">
                              {errors.message}
                            </span>
                          )}
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-[3px] bg-[#252525] text-sm font-medium text-white transition hover:bg-[#303030] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? loadingText : buttonText}
                </button>

                {status === "success" && (
                  <p className="text-sm text-emerald-400">{copy.success}</p>
                )}

                {(status === "error" || errors.form) && (
                  <p className="text-sm text-red-400">
                    {errors.form || copy.error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
