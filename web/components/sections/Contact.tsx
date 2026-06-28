"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { site } from "../../lib/data/site";

import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

type FormStatus = "idle" | "success" | "error";

export function Contact({ locale = "en" }: { locale?: "en" | "al" }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = {
    label: locale === "al" ? "CONTACT" : "CONTACT",
    title: locale === "al" ? "MË KONTAKTO" : "GET IN TOUCH",
    formTitle: locale === "al" ? "Dërgo Mesazh" : "Send Message",
    name: locale === "al" ? "Emri" : "Name",
    namePlaceholder: locale === "al" ? "Emri juaj" : "Your Name",
    email: "Email",
    emailPlaceholder: "name@domain.com",
    message: locale === "al" ? "Mesazhi" : "Message",
    messagePlaceholder:
      locale === "al" ? "Shkruaj Mesazhin Tënd" : "Type Your Message",
    button: locale === "al" ? "Dërgo Mesazh" : "Send Message",
    sending: locale === "al" ? "Duke dërguar..." : "Sending...",
    success:
      locale === "al"
        ? "Mesazhi u dërgua me sukses."
        : "Message sent successfully.",
    error:
      locale === "al"
        ? "Diçka shkoi keq. Provo përsëri."
        : "Something went wrong. Please try again.",
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("idle");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            >
              <h3 className="text-lg font-medium text-white">{copy.formTitle}</h3>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">
                    {copy.name}
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={copy.namePlaceholder}
                    className="h-10 w-full rounded-[3px] border border-transparent bg-[#252525] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">
                    {copy.email}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={copy.emailPlaceholder}
                    className="h-10 w-full rounded-[3px] border border-transparent bg-[#252525] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">
                    {copy.message}
                  </span>
                  <textarea
                    name="message"
                    rows={8}
                    required
                    placeholder={copy.messagePlaceholder}
                    className="min-h-[176px] w-full resize-y rounded-[3px] border border-transparent bg-[#252525] px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-[3px] bg-[#252525] text-sm font-medium text-white transition hover:bg-[#303030] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? copy.sending : copy.button}
                </button>

                {status === "success" && (
                  <p className="text-sm text-emerald-400">{copy.success}</p>
                )}

                {status === "error" && (
                  <p className="text-sm text-red-400">{copy.error}</p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
