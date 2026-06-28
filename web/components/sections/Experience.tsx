"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { experience } from "../../lib/data/experience";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

function ExperienceCard({
  item,
  index,
  locale,
}: {
  item: (typeof experience)[0];
  index: number;
  locale: "en" | "al";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start gap-6">
        {/* Logo me rrotullim çdo 10 sekonda */}
        {item.logo && (
          <motion.img
            src={item.logo}
            alt={item.company}
            className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
            initial={{ opacity: 0, scale: 0.8, x: -12 }}
            animate={inView ? {
              opacity: 1,
              scale: 1,
              x: 0,
              rotate: [0, 0, 360, 360, 0],
            } : {}}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 + 0.1 },
              scale: { duration: 0.5, delay: index * 0.1 + 0.1, ease: [0.34, 1.56, 0.64, 1] },
              x: { duration: 0.5, delay: index * 0.1 + 0.1 },
              rotate: {
                duration: 10,
                repeat: Infinity,
                repeatDelay: 0,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1, 1],
                delay: index * 0.1 + 0.6,
              },
            }}
          />
        )}

        {/* Info */}
        <div className="min-w-0 pt-4">
          <motion.h3
            className="text-base font-semibold text-white md:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
          >
            {locale === "al" ? item.roleAl : item.role}
          </motion.h3>

          <motion.p
            className="mt-0.5 text-sm text-neutral-400"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          >
            {item.company}
          </motion.p>

          <motion.p
            className="mt-0.5 text-sm text-neutral-500"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.25 }}
          >
            {locale === "al" ? item.periodAl : item.period}
          </motion.p>

          {/* Desktop: description brenda kolonës */}
          <motion.p
            className="mt-5 hidden leading-7 text-neutral-400 text-[15px] md:block"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.35 }}
          >
            {locale === "al" ? item.descriptionAl : item.description}
          </motion.p>
        </div>
      </div>

      {/* Mobile: description poshtë të dyve */}
      <motion.p
        className="mt-5 leading-7 text-neutral-400 text-[15px] md:hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.35 }}
      >
        {locale === "al" ? item.descriptionAl : item.description}
      </motion.p>
    </motion.div>
  );
}

export function Experience({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "eksperienca" : "experience"}
      className="border-t border-white/10"
    >
      <Container>
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-neutral-400">
              {locale === "al" ? "Eksperienca" : "Experience"}
            </p>
            <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              {locale === "al"
                ? "Eksperiencë praktike në ndërtimin e projekteve reale softuerike."
                : "Practical experience building real software projects."}
            </h2>
          </div>
        </Reveal>

        <div className="space-y-10">
          {experience.map((item, i) => (
            <ExperienceCard key={`${item.role}-${item.company}`} item={item} index={i} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
