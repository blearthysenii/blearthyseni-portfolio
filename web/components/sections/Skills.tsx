import { skills } from "../../lib/data/skills";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Skills({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "aftesite" : "skills"}
      className="border-t border-white/10"
    >
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-400">
              {locale === "al" ? "Teknologjitë" : "Tech Stack"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {locale === "al"
                ? "Teknologjitë që përdor çdo ditë."
                : "Technologies I use every day."}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-white/10 bg-neutral-950 p-7"
              >
                <h3 className="text-xl font-semibold">
                  {locale === "al" && group.title === "Database"
                    ? "Databaza"
                    : locale === "al" && group.title === "Tools"
                    ? "Veglat"
                    : group.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-black px-3 py-1.5 text-sm font-medium text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
