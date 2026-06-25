import { about } from "../../lib/data/about";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section id="about" className="border-t border-black/10 dark:border-white/10">
      <Container>
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                About me
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                {about.heading}
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}