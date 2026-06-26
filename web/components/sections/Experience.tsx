import { experience } from "../../lib/data/experience";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Experience({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "eksperienca" : "experience"}
      className="border-t border-neutral-200 dark:border-white/10"
    >
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {locale === "al" ? "Eksperienca" : "Experience"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {locale === "al"
                ? "Eksperiencë praktike në ndërtimin e projekteve reale softuerike."
                : "Practical experience building real software projects."}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            {experience.map((item) => (
              <div
                key={`${item.role}-${item.company}`}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:shadow-none"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                      {item.company}
                    </p>
                  </div>

                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {item.period}
                  </span>
                </div>

                <p className="mt-5 leading-7 text-neutral-700 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
