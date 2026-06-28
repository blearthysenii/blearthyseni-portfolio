"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { scrollToSection } from "../../lib/scrollToSection";
import { MobileMenu } from "./MobileMenu";

type Locale = "en" | "al";

const SCROLL_STORAGE_PREFIX = "bleart-scroll:";

const links = {
  en: [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Certifications", id: "certificates" },
    { label: "Contact", id: "contact" },
  ],
  al: [
    { label: "Rreth meje", id: "rreth-meje" },
    { label: "Aftesite", id: "aftesite" },
    { label: "Projektet", id: "projektet" },
    { label: "Eksperienca", id: "eksperienca" },
    { label: "Certifikimet", id: "certifikatat" },
    { label: "Kontakti", id: "kontakti" },
  ],
} satisfies Record<Locale, { label: string; id: string }[]>;

export function Navbar() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/al") ? "al" : "en";
  const currentPath = pathname.replace(/\/$/, "");
  const targetLocale: Locale = locale === "en" ? "al" : "en";
  const isResumePage = currentPath === "/en/resume" || currentPath === "/al/cv";
  const switchHref = isResumePage
    ? locale === "en"
      ? "/al/cv"
      : "/en/resume"
    : locale === "en"
      ? "/al"
      : "/en";
  const switchLabel = locale === "en" ? "AL" : "EN";
  const resumeHref = locale === "en" ? "/en/resume" : "/al/cv";
  const homePath = `/${locale}`;

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (currentPath !== homePath) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `${homePath}#${sectionId}`);
    scrollToSection(sectionId);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (currentPath !== homePath) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", homePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getActiveSectionId = () => {
    const scrollPaddingTop =
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
    const currentY = window.scrollY + scrollPaddingTop + 1;
    const sections = links[locale]
      .map((link) => {
        const section = document.getElementById(link.id);

        if (!section) {
          return null;
        }

        return {
          id: link.id,
          top: section.getBoundingClientRect().top + window.scrollY,
        };
      })
      .filter((section): section is { id: string; top: number } =>
        Boolean(section),
      );

    for (let index = 0; index < sections.length; index += 1) {
      const currentSection = sections[index];
      const nextSection = sections[index + 1];
      const sectionEnd = nextSection?.top ?? Number.POSITIVE_INFINITY;

      if (currentY >= currentSection.top && currentY < sectionEnd) {
        return currentSection.id;
      }
    }

    return null;
  };

  const handleLanguageSwitchClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isResumePage || currentPath !== homePath) {
      return;
    }

    event.preventDefault();

    const activeSectionId = getActiveSectionId();

    if (!activeSectionId) {
      const targetPath = `/${targetLocale}`;

      try {
        sessionStorage.setItem(`${SCROLL_STORAGE_PREFIX}${targetPath}`, "0");
      } catch {
        // Ignore private browsing or storage restrictions.
      }

      window.location.href = targetPath;
      return;
    }

    const activeIndex = links[locale].findIndex(
      (link) => link.id === activeSectionId,
    );
    const targetSectionId = links[targetLocale][activeIndex]?.id;

    if (!targetSectionId) {
      return;
    }

    const targetPath = `/${targetLocale}#${targetSectionId}`;

    try {
      sessionStorage.removeItem(`${SCROLL_STORAGE_PREFIX}${targetPath}`);
    } catch {
      // Ignore private browsing or storage restrictions.
    }

    window.location.href = targetPath;
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050505]/90 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          onClick={handleHomeClick}
          className="shrink-0 text-sm font-bold tracking-tight text-white"
        >
          Bleart Hyseni
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links[locale].map((link) => (
            <Link
              key={link.id}
              href={`/${locale}#${link.id}`}
              onClick={(event) => handleNavClick(event, link.id)}
              className="whitespace-nowrap text-sm font-medium text-neutral-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={resumeHref}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950 text-white transition hover:bg-neutral-900 lg:inline-flex"
            aria-label={locale === "en" ? "Resume" : "CV"}
          >
            <Image
              src="/icons/resume.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Link>

          <Link
            href={switchHref}
            onClick={handleLanguageSwitchClick}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950 px-3 text-xs font-bold text-white transition hover:bg-neutral-900"
          >
            {switchLabel}
          </Link>

          <MobileMenu locale={locale} />
        </div>
      </nav>
    </header>
  );
}
