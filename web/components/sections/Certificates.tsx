"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";

import { certificates } from "../../lib/data/achievements";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const certificateStyles = [
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(147,197,253,0.16)_46%,rgba(37,99,235,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.32),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(147,197,253,0.16)_36%,rgba(37,99,235,0.24)_68%,rgba(9,20,55,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(59,130,246,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(59,130,246,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(253,186,116,0.16)_46%,rgba(194,65,12,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(253,186,116,0.16)_36%,rgba(194,65,12,0.24)_68%,rgba(55,21,8,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(249,115,22,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(249,115,22,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(216,180,254,0.16)_46%,rgba(126,34,206,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.31),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.17)_0%,rgba(216,180,254,0.16)_36%,rgba(126,34,206,0.24)_68%,rgba(38,14,66,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(168,85,247,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(168,85,247,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(94,234,212,0.16)_46%,rgba(13,148,136,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(94,234,212,0.16)_36%,rgba(13,148,136,0.24)_68%,rgba(6,46,42,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(45,212,191,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(45,212,191,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(253,164,175,0.16)_46%,rgba(190,18,60,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(253,164,175,0.16)_36%,rgba(190,18,60,0.24)_68%,rgba(55,8,24,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(244,63,94,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(244,63,94,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(110,231,183,0.16)_46%,rgba(5,150,105,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(110,231,183,0.16)_36%,rgba(5,150,105,0.24)_68%,rgba(4,48,31,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(52,211,153,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(52,211,153,0.06)]",
  },
  {
    stack:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(103,232,249,0.16)_46%,rgba(8,145,178,0.24)_100%)] backdrop-blur-xl",
    card:
      "bg-[radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(103,232,249,0.16)_36%,rgba(8,145,178,0.24)_68%,rgba(5,42,54,0.58)_100%)] backdrop-blur-2xl",
    shadow: "shadow-[0_18px_42px_rgba(34,211,238,0.08)]",
    stackShadow: "shadow-[0_12px_30px_rgba(34,211,238,0.06)]",
  },
];

const AUTO_ADVANCE_DELAY = 10000;
const CARD_EXIT_DURATION = 560;
const SWIPE_DISTANCE = 72;
const SWIPE_VELOCITY = 520;

function getCertificateStyle(index: number) {
  return certificateStyles[index % certificateStyles.length];
}

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === "previous" ? (
        <path
          fillRule="evenodd"
          d="M11.78 4.22a.75.75 0 0 1 0 1.06L7.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M8.22 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06-1.06L12.94 10 8.22 5.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="ml-2 h-4 w-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 0 1 0-1.06L12.94 6H8.75a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7.06l-7.72 7.72a.75.75 0 0 1-1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Certificates({ locale = "en" }: { locale?: "en" | "al" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [exitSide, setExitSide] = useState<"left" | "right">("right");
  const cycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCertificate = certificates[activeIndex];
  const activeTitle =
    locale === "al" ? activeCertificate.titleAl : activeCertificate.title;
  const activeStyle = getCertificateStyle(activeIndex);
  const pendingCertificate =
    pendingIndex === null ? null : certificates[pendingIndex];
  const pendingTitle = pendingCertificate
    ? locale === "al"
      ? pendingCertificate.titleAl
      : pendingCertificate.title
    : "";
  const pendingStyle =
    pendingIndex === null ? null : getCertificateStyle(pendingIndex);

  const cycleCertificate = useCallback(
    (direction: "previous" | "next", side: "left" | "right" = "right") => {
      if (isCycling || certificates.length <= 1) {
        return;
      }

      const nextIndex =
        direction === "previous"
          ? activeIndex === 0
            ? certificates.length - 1
            : activeIndex - 1
          : activeIndex === certificates.length - 1
            ? 0
            : activeIndex + 1;

      setPendingIndex(nextIndex);
      setExitSide(side);
      setIsCycling(true);

      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }

      cycleTimeoutRef.current = setTimeout(() => {
        setActiveIndex(nextIndex);
        setPendingIndex(null);
        setIsCycling(false);
      }, CARD_EXIT_DURATION);
    },
    [activeIndex, isCycling],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      cycleCertificate("next");
    }, AUTO_ADVANCE_DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [cycleCertificate]);

  useEffect(() => {
    return () => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
    };
  }, []);

  const showPrevious = () => cycleCertificate("previous", "left");
  const showNext = () => cycleCertificate("next", "right");
  const stackOffsets = Array.from(
    { length: Math.min(certificates.length - 1, certificateStyles.length - 1) },
    (_, index) => index + 1,
  );
  const handleCardDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (isCycling) {
      return;
    }

    if (info.offset.x <= -SWIPE_DISTANCE || info.velocity.x <= -SWIPE_VELOCITY) {
      cycleCertificate("next", "left");
      return;
    }

    if (info.offset.x >= SWIPE_DISTANCE || info.velocity.x >= SWIPE_VELOCITY) {
      cycleCertificate("previous", "right");
    }
  };

  return (
    <Section
      id={locale === "al" ? "certifikatat" : "certificates"}
      className="overflow-hidden border-t border-white/10 bg-[#050607]"
    >
      <Container>
        <div className="grid items-center gap-12 py-6 lg:grid-cols-[0.78fr_1.04fr_0.9fr] lg:gap-8 xl:grid-cols-[0.72fr_1fr_0.86fr]">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-[27rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
                {locale === "al" ? "CERTIFIKIMET" : "CERTIFICATIONS"}
              </p>
            <h2 className="mt-5 text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem]">
              {locale === "al"
                ? "MËSIM I VAZHDUESHËM PËRMES CERTIFIKIMEVE DHE ZHVILLIMIT PRAKTIK."
                : "CONTINUOUS LEARNING THROUGH CERTIFICATIONS AND HANDS-ON DEVELOPMENT."}
            </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -46 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.75,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto flex w-full max-w-[390px] justify-center pt-16 sm:max-w-[430px] lg:max-w-[410px] lg:pt-20"
          >
            {stackOffsets.map((offset, index) => {
              const stackIndex =
                isCycling && pendingIndex !== null
                  ? pendingIndex + offset
                  : activeIndex + offset;
              const stackStyle = getCertificateStyle(stackIndex);

              return (
                <motion.div
                  key={offset}
                  className={`absolute left-1/2 top-16 h-[430px] w-[82%] -translate-x-1/2 rounded-[2rem] border border-white/[0.12] ${stackStyle.stack} ${stackStyle.stackShadow} ring-1 ring-white/[0.08] sm:h-[470px] lg:top-20`}
                  initial={false}
                  animate={{
                    y: isCycling ? -(index + 1) * 11 : -(index + 1) * 10,
                    scale: isCycling
                      ? 1 - index * 0.018
                      : 1 - index * 0.022,
                    opacity: isCycling
                      ? 0.94 - index * 0.055
                      : 0.98 - index * 0.055,
                  }}
                  transition={{
                    duration: 0.56,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ zIndex: stackOffsets.length - index }}
                />
              );
            })}

            {isCycling && pendingCertificate && pendingStyle ? (
              <motion.article
                className={`absolute left-1/2 top-16 z-[9] flex h-[430px] w-[82%] -translate-x-1/2 flex-col overflow-hidden rounded-[2rem] border border-white/[0.16] ${pendingStyle.card} p-7 ${pendingStyle.shadow} ring-1 ring-white/[0.08] sm:h-[470px] sm:p-8 lg:top-20`}
                initial={false}
                animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.56,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Image
                      src={pendingCertificate.image}
                      alt={pendingCertificate.issuer}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-white/65">
                    {pendingCertificate.year}
                  </span>
                </div>

                <div className="mt-auto pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300/35">
                    {pendingCertificate.issuer}
                  </p>
                  <h3 className="mt-3 max-w-[15rem] text-2xl font-medium leading-snug tracking-tight text-neutral-300/85 sm:text-3xl">
                    {pendingTitle}
                  </h3>
                </div>
              </motion.article>
            ) : null}

            <motion.article
              key={activeCertificate.credential}
              className={`relative z-10 flex h-[430px] w-[82%] touch-pan-y select-none flex-col overflow-hidden rounded-[2rem] border border-white/[0.16] ${activeStyle.card} cursor-grab p-7 ${activeStyle.shadow} ring-1 ring-white/[0.08] active:cursor-grabbing sm:h-[470px] sm:p-8`}
              drag={isCycling ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragEnd={handleCardDragEnd}
              whileDrag={{ scale: 0.98 }}
              initial={false}
              animate={{
                x: isCycling ? (exitSide === "left" ? -360 : 360) : 0,
                y: 0,
                rotate: isCycling ? (exitSide === "left" ? -4 : 4) : 0,
                scale: isCycling ? 0.86 : 1,
                opacity: isCycling ? 0 : 1,
              }}
              transition={{
                duration: 0.56,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center">
                  <Image
                    src={activeCertificate.image}
                    alt={activeCertificate.issuer}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-white/65">
                  {activeCertificate.year}
                </span>
              </div>

              <motion.div
                key={activeCertificate.credential}
                className="mt-auto pb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300/35">
                  {activeCertificate.issuer}
                </p>
                <h3 className="mt-3 max-w-[15rem] text-2xl font-medium leading-snug tracking-tight text-neutral-300/85 sm:text-3xl">
                  {activeTitle}
                </h3>
              </motion.div>
            </motion.article>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.75,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="ml-auto w-full max-w-md">
              <motion.div
                key={activeCertificate.credential}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
                  {activeCertificate.issuer}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                  {activeTitle}
                </h3>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-5">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Year
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-white/85">
                      {activeCertificate.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Credential
                    </dt>
                    <dd className="mt-2 truncate text-sm font-medium text-white/85">
                      {activeTitle}
                    </dd>
                  </div>
                </dl>
              </motion.div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={activeCertificate.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-neutral-950 shadow-[0_18px_50px_rgba(255,255,255,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/90"
                >
                  {locale === "al" ? "Shiko" : "Visit"}
                  <ExternalIcon />
                </a>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label={
                      locale === "al"
                        ? "Certifikata e mëparshme"
                        : "Previous certificate"
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <ArrowIcon direction="previous" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label={
                      locale === "al"
                        ? "Certifikata tjetër"
                        : "Next certificate"
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <ArrowIcon direction="next" />
                  </button>
                </div>
              </div>

              <p className="mt-5 text-sm text-white/35">
                {activeIndex + 1} / {certificates.length}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
