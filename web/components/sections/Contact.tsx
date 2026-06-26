import { Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { site } from "../../lib/data/site";
import { socials } from "../../lib/data/socials";

import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Contact({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "kontakti" : "contact"}
      className="border-t border-white/10"
    >
      <Container>
        <Reveal>
          <div className="rounded-[2rem] bg-black p-8 text-white md:p-12">
            <p className="text-sm font-medium text-neutral-400">
              {locale === "al" ? "Kontakti" : "Contact"}
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              {locale === "al"
                ? "Le të ndërtojmë diçka të pastër, të dobishme dhe moderne."
                : "Let&apos;s build something clean, useful and modern."}
            </h2>

            <p className="mt-6 max-w-2xl leading-7 text-neutral-400">
              {locale === "al"
                ? "Jam i hapur për mundësi praktike, role junior developer dhe projekte full-stack web."
                : "I&apos;m open to internship opportunities, junior developer roles and full-stack web projects."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                <Mail size={18} />
                {locale === "al" ? "Dërgo Email" : "Send Email"}
              </a>

              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <IconBrandGithub size={18} />
                GitHub
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <IconBrandLinkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
