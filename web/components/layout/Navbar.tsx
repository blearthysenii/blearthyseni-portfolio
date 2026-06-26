"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";

const links = {
  en: [
    { label: "About", href: "/en/about" },
    { label: "Skills", href: "/en/skills" },
    { label: "Projects", href: "/en/projects" },
    { label: "Experience", href: "/en/experience" },
    { label: "Contact", href: "/en/contact" },
  ],
  al: [
    { label: "Rreth meje", href: "/al/rreth-meje" },
    { label: "Aftesite", href: "/al/aftesite" },
    { label: "Projektet", href: "/al/projektet" },
    { label: "Eksperienca", href: "/al/eksperienca" },
    { label: "Kontakti", href: "/al/kontakti" },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/al") ? "al" : "en";
  const switchHref = locale === "en" ? "/al" : "/en";
  const switchLabel = locale === "en" ? "AL" : "EN";

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#050505]">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-bold tracking-tight text-black dark:text-white"
        >
          Bleart Hyseni
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links[locale].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href={switchHref}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-3 text-xs font-bold text-black transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
          >
            {switchLabel}
          </Link>

          <MobileMenu locale={locale} />
        </div>
      </nav>
    </header>
  );
}