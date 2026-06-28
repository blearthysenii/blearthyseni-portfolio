"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { scrollToSection } from "../../lib/scrollToSection";
import { MobileMenu } from "./MobileMenu";

type Locale = "en" | "al";

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
  const switchHref = locale === "en" ? "/al" : "/en";
  const switchLabel = locale === "en" ? "AL" : "EN";
  const homePath = `/${locale}`;

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (pathname.replace(/\/$/, "") !== homePath) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `${homePath}#${sectionId}`);
    scrollToSection(sectionId);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname.replace(/\/$/, "") !== homePath) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", homePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            href={switchHref}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950 px-3 text-xs font-bold text-white transition hover:bg-neutral-900"
          >
            {switchLabel}
          </Link>

          <MobileMenu locale={locale} />
        </div>
      </nav>
    </header>
  );
}
