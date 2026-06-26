"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { site } from "../../lib/data/site";
import { socials } from "../../lib/data/socials";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Hero({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] pt-24 text-white md:pt-32">
      <Container className="relative flex min-h-[calc(100vh-6rem)] flex-col px-6 pb-12 md:min-h-[calc(100vh-8rem)] md:justify-center md:px-8">
        {/* Image */}
        <div className="relative order-1 mx-auto mt-2 flex w-full max-w-[800px] justify-center md:absolute md:right-[-10px] md:top-1/2 md:order-none md:mt-0 md:w-[60%] md:max-w-[780px] md:-translate-y-1/2 lg:right-0">
          <div className="absolute bottom-20 h-[58%] w-[78%] rounded-full bg-white/10 blur-3xl" />

          <Image
            src="/images/men.png"
            alt={site.name}
            width={900}
            height={1200}
            priority
            className="relative z-10 h-auto w-[92%] object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.35)] md:w-full"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30%] bg-gradient-to-t from-[#050505] from-30% to-transparent md:h-[35%] md:from-[#050505] md:from-30% md:to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-30 order-2 mt-[-55%] max-w-3xl md:order-none md:mt-0 md:max-w-[54%] lg:max-w-[58%]">
          <h1 className="mt-7 text-[52px] font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl md:text-[72px] lg:text-[88px]">
            {locale === "al"
              ? "Ndërtoj eksperienca moderne dhe të pastra në web."
              : "Building clean, modern web experiences."}
          </h1>

          <p className="mt-6 max-w-2xl text-[18px] leading-8 text-neutral-400 md:text-xl">
            {locale === "al" ? "Unë jam " : "I'm "}
            <span className="font-semibold text-neutral-300">
              {site.name}
            </span>
            {locale === "al"
              ? ", Full Stack Web Developer i fokusuar në React, Next.js, FastAPI dhe PostgreSQL."
              : `, a ${site.title} focused on React, Next.js, FastAPI and PostgreSQL.`}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row md:max-w-xl">
            <Button
              href={locale === "al" ? "/al/projektet" : "/en/projects"}
              className="h-16 w-full justify-center rounded-2xl bg-white text-base font-semibold text-black hover:bg-neutral-200"
            >
              <span className="flex items-center gap-3">
                {locale === "al" ? "Shiko Projektet" : "View Projects"}
                <ArrowUpRight size={19} />
              </span>
            </Button>

            <Button
              href={locale === "al" ? "/al/kontakti" : "/en/contact"}
              variant="secondary"
              className="h-16 w-full justify-center rounded-2xl border border-white/20 bg-transparent text-base font-semibold text-white hover:bg-white/5"
            >
              {locale === "al" ? "Më Kontakto" : "Contact Me"}
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 text-neutral-400">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition hover:text-white"
              aria-label="GitHub"
            >
              <IconBrandGithub size={32} />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition hover:text-white"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={32} />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="flex flex-col items-center gap-2 transition hover:text-white"
              aria-label="Email"
            >
              <Mail size={32} />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}