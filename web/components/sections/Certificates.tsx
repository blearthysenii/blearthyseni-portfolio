import { achievements } from "../../lib/data/achievements";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Certificates({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "certifikatat" : "certificates"}
      className="border-t border-white/10"
    >
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-400">
              {locale === "al" ? "Arritjet" : "Achievements"}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {locale === "al"
                ? "Mësim, praktikë dhe progres përmes projekteve reale."
                : "Learning, practice and progress through real projects."}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-neutral-950 p-6 text-lg font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
