import { ArrowUpRight } from "lucide-react";

import { projects } from "../../lib/data/projects";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function Projects() {
  return (
    <Section id="projects" className="border-t border-neutral-200 dark:border-white/10">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Featured Projects
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Real projects built with full-stack technologies.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className="group rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-neutral-950 dark:hover:bg-neutral-900"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <ArrowUpRight className="mt-1 opacity-40 transition group-hover:opacity-100" />
                </div>

                <p className="mt-5 leading-7 text-neutral-700 dark:text-neutral-400">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700 dark:border-white/10 dark:bg-black dark:text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}