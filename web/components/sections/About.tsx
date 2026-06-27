"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about } from "../../lib/data/about";
import { site } from "../../lib/data/site";
import { Section } from "../ui/Section";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
});

const titleFont = bebasNeue.style.fontFamily;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

function Ticker({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <style>{`
        @keyframes about-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-ticker-inner { animation: none !important; }
        }
      `}</style>
      <div
        className="about-ticker-inner flex whitespace-nowrap will-change-transform"
        style={{ animation: "about-ticker 28s linear infinite" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} style={{ paddingRight: "4em" }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About({ locale = "en" }: { locale?: "en" | "al" }) {
  const headingText = locale === "al" ? "RRETH MEJE" : "ABOUT ME";
  const paragraphs = locale === "al" ? about.paragraphsAl : about.paragraphs;

  const subtitle =
    locale === "al"
      ? "TEKNOLOGJI. PERFORMANCË. INOVACION. AI. FULL STACK. ZHVILLIM WEB. KOD I PASTËR. PËRVOJË E PËRDORUESIT. SHKALLËZUESHMËRI. ZGJIDHJE PROBLEMESH."
      : "TECHNOLOGY. PERFORMANCE. INNOVATION. AI. FULL STACK. WEB DEVELOPMENT. CLEAN CODE. USER EXPERIENCE. SCALABILITY. PROBLEM SOLVING.";

  return (
    <Section
      id={locale === "al" ? "rreth-meje" : "about"}
      noPadding
      className="overflow-hidden border-t border-white/10 bg-[#050505] text-white"
    >
      {/* ─── MOBILE (< lg) ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col bg-[#050505] px-5 pb-16 pt-10 text-white lg:hidden">
        <Ticker
          text={subtitle}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.42em] text-neutral-500"
        />

        <div className="overflow-hidden">
          <motion.h2
            {...fadeIn(0.08)}
            className="mb-6 uppercase leading-[0.88] text-[#f0ede8]"
            style={{
              fontSize: "clamp(58px, 17vw, 108px)",
              fontFamily: titleFont,
            }}
          >
            {headingText}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
          className="relative mb-9 w-full overflow-hidden rounded-[10px]"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src="/images/ab-me.png"
            alt={site.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          {...fadeUp(0.24)}
          className="space-y-6 text-[17px] font-light leading-[1.7] tracking-[-0.02em] text-neutral-300"
        >
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.32)}
          className="mt-10 border-t border-white/10 pt-5 text-right"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-neutral-600">
            {site.domain}
          </span>
        </motion.div>
      </div>

      {/* ─── DESKTOP (lg+) ─────────────────────────────────────────────────── */}
      <div className="hidden min-h-screen bg-[#050505] text-white lg:flex lg:items-center">
        <div className="relative mx-auto w-full max-w-[1024px] px-8 py-20">

          {/* Grid: heading spans both columns, then photo + text below */}
          <div className="relative z-10 mx-auto grid w-full max-w-[860px] grid-cols-[320px_minmax(0,1fr)] items-start gap-10 pb-10">

            {/* Ticker + Heading — col-span-2, exact same width as photo+gap+text */}
            <div className="col-span-2 -mb-2">
              <Ticker
                text={subtitle}
                className="mb-2 text-[11px] font-medium uppercase tracking-[0.58em] text-neutral-300/80"
              />
              <motion.h2
                {...fadeIn(0.08)}
                aria-label={headingText}
                className="pointer-events-none w-full select-none uppercase text-[#f0ede8]"
                style={{
                  fontFamily: titleFont,
                  fontSize: "210px",
                  lineHeight: "0.8",
                  letterSpacing: "-0.02em",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {headingText.split("").map((ch, i) => (
                  <span key={i}>{ch === " " ? "\u00A0" : ch}</span>
                ))}
              </motion.h2>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
              className="relative h-[350px] w-[320px] shrink-0 overflow-hidden"
            >
              <Image
                src="/images/ab-me.png"
                alt={site.name}
                fill
                priority
                className="object-cover object-center"
                sizes="320px"
              />
            </motion.div>

            {/* Text */}
            <div className="flex min-w-0 flex-col justify-start pt-0">
              <div className="space-y-4 text-[15px] font-light leading-[1.58] tracking-[0.01em] text-neutral-100">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={p}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.35 + i * 0.12 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.7 }}
                style={{ transformOrigin: "right" }}
                className="mt-7 text-right"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#a67c48]">
                  {site.domain}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
