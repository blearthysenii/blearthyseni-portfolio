import { achievements } from "../../lib/data/achievements";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Certificates() {
  return (
    <Section id="certificates" className="border-t border-neutral-200 dark:border-white/10">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Achievements
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Learning, practice and progress through real projects.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-white p-6 text-lg font-medium shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:shadow-none"
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