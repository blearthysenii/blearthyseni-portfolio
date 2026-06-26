"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { site } from "../../lib/data/site";
import { socials } from "../../lib/data/socials";

import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as number[], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 1.03 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as number[], delay: 0.1 },
  },
};

const wordContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1 as const,
    },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as number[] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as number[] },
  },
};

const slogansEn = [
  "Building software people love to use.",
  "Modern software. Real impact.",
  "Code. Create. Deliver.",
];

const slogansAl = [
  "I kthej idetë në produkte digjitale.",
  "Softuer modern. Ndikim real.",
  "Kodoj. Krijoj. Realizoj.",
];

function AnimatedTitle({ text, id }: { text: string; id: number }) {
  const words = text.split(" ");
  return (
    <motion.h1
      key={id}
      className="mt-7 text-[52px] font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl md:text-[72px] lg:text-[88px]"
      variants={wordContainer}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordItem}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function Hero({ locale = "en" }: { locale?: "en" | "al" }) {
  const slogans = locale === "al" ? slogansAl : slogansEn;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] pt-24 text-white md:pt-32">
      <Container className="relative flex min-h-[calc(100vh-6rem)] flex-col px-6 pb-12 md:min-h-[calc(100vh-8rem)] md:justify-center md:px-8">
        {/* Image */}
        <motion.div
          className="relative order-1 mx-auto mt-2 flex w-full max-w-[800px] justify-center md:absolute md:right-[-10px] md:top-1/2 md:order-none md:mt-0 md:w-[60%] md:max-w-[780px] md:-translate-y-1/2 lg:right-0"
          variants={fadeIn}
          initial="hidden"
          animate="show"
        >
          <div className="absolute bottom-20 h-[58%] w-[78%] rounded-full bg-white/10 blur-3xl" />

          <Image
            src="/images/men.png"
            alt={site.name}
            width={900}
            height={1200}
            priority
            className="relative z-10 h-auto w-[92%] object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.35)] md:w-full"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30%] bg-gradient-to-t from-[#050505] from-30% to-transparent md:h-[35%] md:from-[#050505] md:from-30% md:to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-30 order-2 mt-[-55%] max-w-3xl md:order-none md:mt-0 md:max-w-[54%] lg:max-w-[58%]">

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <AnimatedTitle key={index} text={slogans[index]} id={index} />
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-6 max-w-2xl text-[18px] leading-8 text-neutral-400 md:text-xl"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.7}
          >
            {locale === "al"
              ? "Unë jam Bleart Hyseni, Full Stack Web Developer që krijon eksperienca moderne në web me fokus te performanca, shkallëzueshmëria dhe përvoja e përdoruesit."
              : "I'm Bleart Hyseni, a Full Stack Web Developer building fast, scalable and user-focused digital experiences."}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row md:max-w-xl"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.85}
          >
            <Button
              href={locale === "al" ? "/al/projektet" : "/en/projects"}
              className="h-16 w-full justify-center rounded-2xl bg-white text-base font-semibold text-black transition-transform duration-200 hover:scale-[1.02] hover:bg-neutral-200"
            >
              <span className="flex items-center gap-3">
                {locale === "al" ? "Shiko Projektet" : "View Projects"}
                <ArrowUpRight size={19} />
              </span>
            </Button>

            <Button
              href={locale === "al" ? "/al/kontakti" : "/en/contact"}
              variant="secondary"
              className="h-16 w-full justify-center rounded-2xl border border-white/20 bg-transparent text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-white/5"
            >
              {locale === "al" ? "Më Kontakto" : "Contact Me"}
            </Button>
          </motion.div>

          <motion.div
            className="mt-10 grid max-w-xl grid-cols-3 text-neutral-400"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.0}
          >
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:text-white"
              aria-label="GitHub"
            >
              <IconBrandGithub size={32} />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:text-white"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={32} />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:text-white"
              aria-label="Email"
            >
              <Mail size={32} />
              <span className="text-sm">Email</span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}