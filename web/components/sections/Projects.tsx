"use client";

import { useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { projects } from "../../lib/data/projects";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const techIcons: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  OpenAI: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
};

function TechPill({ item }: { item: string }) {
  const icon = techIcons[item];
  if (!icon) return null;
  return (
    <img
      src={icon}
      alt={item}
      title={item}
      className="h-6 w-6 shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100"
      style={item === "OpenAI" ? { filter: "invert(1) brightness(0.6)" } : undefined}
    />
  );
}

function ProjectRow({
  project,
  index,
  locale,
}: {
  project: (typeof projects)[0];
  index: number;
  locale: "en" | "al";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="group relative grid grid-cols-1 items-center gap-8 border-t border-white/[0.06] py-14 md:grid-cols-[1fr_1px_56px_1px_1fr] md:gap-0"
    >
      {/* Left: project image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="transition-transform duration-500 ease-out group-hover:scale-[1.02] -mx-6 md:mx-0"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full object-contain md:w-full"
        />
      </motion.div>

      {/* Divider left */}
      <motion.div
        className="hidden w-px bg-white/[0.08] md:block"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ height: 96, transformOrigin: "top" }}
      />

      {/* Center: Number */}
      <div className="hidden md:flex md:items-center md:justify-center">
        <motion.span
          className="text-[2rem] font-bold tabular-nums tracking-tight select-none"
          style={{ color: "rgba(180, 110, 40, 0.5)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Divider right */}
      <motion.div
        className="hidden w-px bg-white/[0.08] md:block"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ height: 96, transformOrigin: "top" }}
      />

      {/* Right: Project info */}
      <div className="flex flex-col md:pl-10">
        {/* Number mobile */}
        <motion.span
          className="mb-4 text-3xl font-bold tracking-tight select-none md:hidden"
          style={{ color: "rgba(180, 110, 40, 0.5)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.h3
          className="text-2xl font-semibold tracking-tight md:text-3xl"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="mt-3 max-w-xs leading-7 text-neutral-500 md:max-w-sm"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {locale === "al" ? project.descriptionAl : project.description}
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {project.stack.map((item) => (
            <TechPill key={item} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-7"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-60"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {locale === "al" ? "Demo Live" : "Live Demo"}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-white"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export function Projects({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "projektet" : "projects"}
      className="border-t border-white/10"
    >
      <Container>
        {/* Header */}
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              {locale === "al" ? "Projektet kryesore" : "Featured Projects"}
            </p>
            <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              {locale === "al"
                ? "Projektuar për të zgjidhur. Ndërtuar për të qëndruar."
                : "Designed to solve. Built to last."}
            </h2>
            <p className="mt-4 text-neutral-500">
              {locale === "al"
                ? "Çdo projekt është ndërtuar me fokus në performancë, dizajn dhe eksperiencë të përdoruesit."
                : "Every project is built with a focus on performance, design, and user experience."}
            </p>
          </div>
        </Reveal>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
              locale={locale}
            />
          ))}
          <div className="hidden md:block border-t border-white/[0.06]" />
        </div>
      </Container>
    </Section>
  );
}
