"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import { skills } from "../../lib/data/skills";
import { Reveal } from "../common/Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const titleAl: Record<string, string> = {
  Database: "Databaza",
  "AI Tools": "Mjetet AI",
  Tools: "Veglat",
};

const techIcons: Record<string, string> = {
  // Frontend
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  // Backend
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  // Database
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  // AI Tools
  OpenAI: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  ChatGPT: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg",
  Claude: "/icons/claud-icon.png",
  "Claude Code": "/icons/claude-code.png",
  Codex: "/icons/codex.png",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg",
  Render: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/render.svg",
  Neon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/neon.svg",
};

// Icons that are black SVGs and need invert filter on dark bg
const needsInvert = new Set([
  "OpenAI", "ChatGPT",
  "v0", "Bolt.new", "Vercel", "Render", "Neon",
  "GitHub", "Express.js",
]);

// Icons that are local PNGs — get a breathing pulse animation
const isPng = new Set(["Claude", "Claude Code", "Codex"]);

function SkillIcon({
  item,
  groupIndex,
  itemIndex,
  inView,
}: {
  item: string;
  groupIndex: number;
  itemIndex: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const icon = techIcons[item];
  if (!icon) return null;

  const png = isPng.has(item);

  return (
    <motion.div
      key={item}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: groupIndex * 0.08 + itemIndex * 0.045,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={hovered ? { scale: 1.25, y: -4 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative"
      >
        {/* Glow ring on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Breathing pulse glow — të gjitha ikonat */}
        <motion.div className="relative">
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ opacity: [0.0, 0.15, 0.0], scale: [0.8, 1.35, 0.8] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: groupIndex * 0.25 + itemIndex * 0.45,
            }}
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              filter: "blur(7px)",
            }}
          />
          <motion.img
            src={icon}
            alt={item}
            className="h-10 w-10 shrink-0 object-contain relative z-10"
            animate={{
              y: [0, -2, 0],
              opacity: hovered ? 1 : [0.9, 1, 0.9],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: itemIndex * 0.35 },
              opacity: hovered
                ? { duration: 0.15 }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: itemIndex * 0.45 },
            }}
            style={needsInvert.has(item) ? { filter: "invert(1) brightness(0.75)" } : undefined}
          />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="pointer-events-none absolute -bottom-7 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide text-neutral-300"
            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            {item}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SkillGroup({
  group,
  index,
  locale,
}: {
  group: (typeof skills)[0];
  index: number;
  locale: "en" | "al";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const title =
    locale === "al" && titleAl[group.title] ? titleAl[group.title] : group.title;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col"
    >
      {/* Category label */}
      <motion.span
        className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.06 + 0.1 }}
      >
        {title}
      </motion.span>

      {/* Icon grid — extra bottom padding for tooltips */}
      <div className="flex flex-wrap gap-7 pb-4">
        {group.items.map((item, i) => (
          <SkillIcon
            key={item}
            item={item}
            groupIndex={index}
            itemIndex={i}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AnimatedDivider({ delay }: { delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative h-px w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white/[0.06]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

export function Skills({ locale = "en" }: { locale?: "en" | "al" }) {
  return (
    <Section
      id={locale === "al" ? "aftesite" : "skills"}
      className="border-t border-white/10"
    >
      <Container>
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              {locale === "al" ? "Teknologjitë" : "Tech Stack"}
            </p>
            <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              {locale === "al"
                ? "NDRTUAR MBI NJE TEKNOLOGJI MODERNE."
                : "BUILT ON A MODERN TECHNOLOGY STACK."}
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {skills.map((group, i) => (
            <div key={group.title}>
              <div className="py-8">
                <SkillGroup group={group} index={i} locale={locale} />
              </div>
              {i < skills.length - 1 && (
                <AnimatedDivider delay={i * 0.06 + 0.2} />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
