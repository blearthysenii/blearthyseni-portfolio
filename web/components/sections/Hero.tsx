import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { site } from "../../lib/data/site";
import { socials } from "../../lib/data/socials";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-24 text-black dark:bg-[#050505] dark:text-white md:pt-32">
  {/* Mobile portrait background */}
  <div className="pointer-events-none absolute inset-x-0 top-20 h-[62vh] overflow-hidden md:hidden">
    <Image
      src="/images/bleart-hyseni.png"
      alt={site.name}
      fill
      priority
      sizes="100vw"
      className="object-cover object-top"
    />

    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-[#050505]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/10 via-transparent to-[#050505]/10" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
  </div>

  {/* Desktop centered portrait */}
  <div className="pointer-events-none absolute inset-0 hidden md:block">
    <div className="absolute left-1/2 top-1/2 h-[78vh] w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#111111] dark:bg-[#050505]">
      <Image
        src="/images/bleart-hyseni.png"
        alt={site.name}
        fill
        priority
        sizes="520px"
        className="object-cover object-top opacity-85"
      />

      {/* Fade vetëm në fund */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#111111] via-[#111111]/85 via-35% to-transparent dark:from-[#050505] dark:via-[#050505]/85 dark:via-35% dark:to-transparent" />
    </div>
  </div>

      <Container className="relative z-10 flex min-h-[calc(100vh-6rem)] items-end pb-16 md:min-h-[calc(100vh-8rem)] md:items-center md:pb-0">
        <div className="relative z-10 max-w-3xl pt-[46vh] md:pt-0">
          <Badge>Available for opportunities</Badge>

          <h1 className="mt-7 max-w-[11ch] text-[clamp(3.55rem,16vw,5.25rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-white md:mt-8 md:max-w-4xl md:text-7xl md:text-black md:dark:text-white lg:text-8xl">
            Building clean, modern web experiences.
          </h1>

          <p className="mt-6 max-w-2xl text-[1.35rem] leading-[1.7] text-white/60 md:text-lg md:leading-8 md:text-neutral-600 md:dark:text-neutral-400">
            I&apos;m <span className="font-semibold text-white md:text-black md:dark:text-white">{site.name}</span>, a {site.title} focused on React, Next.js, FastAPI and PostgreSQL.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects"><span className="flex items-center gap-2">View Projects<ArrowUpRight size={16} /></span></Button>
            <Button href="#contact" variant="secondary">Contact Me</Button>
          </div>

          <div className="mt-10 flex items-center gap-7 text-white/55 md:gap-5 md:text-neutral-500 md:dark:text-neutral-400">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"><IconBrandGithub size={30} stroke={1.8} className="md:h-[22px] md:w-[22px]" /></a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><IconBrandLinkedin size={30} stroke={1.8} className="md:h-[22px] md:w-[22px]" /></a>
            <a href={`mailto:${site.email}`}><Mail size={30} strokeWidth={1.8} className="md:h-[22px] md:w-[22px]" /></a>
          </div>
        </div>

        <a href="#about" aria-label="Scroll to about section" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/80 transition hover:text-white dark:flex">
          <ArrowDown size={24} />
          <span className="h-2 w-2 rounded-full bg-current" />
        </a>
      </Container>
    </section>
  );
}
