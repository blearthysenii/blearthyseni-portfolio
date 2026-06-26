"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050505] shadow-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="text-sm font-bold tracking-tight text-white"
        >
          Bleart Hyseni
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links[locale].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-400 transition hover:text-white"
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
