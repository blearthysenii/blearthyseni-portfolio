import { ArrowUpRight, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { site } from "../../lib/data/site";
import { socials } from "../../lib/data/socials";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Hero({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <Container className="flex min-h-[calc(100vh-8rem)] items-center">
        <div className="max-w-3xl">
          <Badge>
            {locale === "al" ? "I hapur për mundësi" : "Available for opportunities"}
          </Badge>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-black dark:text-white md:text-7xl">
            {locale === "al"
              ? "Ndërtoj eksperienca moderne dhe të pastra në web."
              : "Building clean, modern web experiences."}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {locale === "al" ? "Unë jam " : "I&apos;m "}
            <span className="font-semibold">{site.name}</span>
            {locale === "al"
              ? ", Full Stack Web Developer i fokusuar në React, Next.js, FastAPI dhe PostgreSQL."
              : `, a ${site.title} focused on React, Next.js, FastAPI and PostgreSQL.`}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={locale === "al" ? "/al/projektet" : "/en/projects"}>
              <span className="flex items-center gap-2">
                {locale === "al" ? "Shiko Projektet" : "View Projects"}
                <ArrowUpRight size={16} />
              </span>
            </Button>

            <Button
              href={locale === "al" ? "/al/kontakti" : "/en/contact"}
              variant="secondary"
            >
              {locale === "al" ? "Më Kontakto" : "Contact Me"}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5 text-neutral-500 dark:text-neutral-400">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-black dark:hover:text-white"
              aria-label="GitHub"
            >
              <IconBrandGithub size={22} />
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-black dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={22} />
            </a>

            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-black dark:hover:text-white"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
