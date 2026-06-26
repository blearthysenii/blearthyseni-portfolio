"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Locale = "en" | "al";

const links = {
  en: [
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Experience", href: "experience" },
    { label: "Contact", href: "contact" },
  ],
  al: [
    { label: "Rreth meje", href: "about" },
    { label: "Aftesite", href: "skills" },
    { label: "Projektet", href: "projects" },
    { label: "Eksperienca", href: "experience" },
    { label: "Kontakti", href: "contact" },
  ],
};

export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="text-white transition duration-300 md:hidden"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed left-0 top-16 z-40 w-full border-b border-white/10 bg-[#050505] text-white shadow-sm transition-all duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6">
          {links[locale].map((item, index) => (
            <Link
              key={item.href}
              href={`/${locale}#${item.href}`}
              onClick={() => setOpen(false)}
              className={`py-3 text-lg font-medium text-neutral-200 transition-all duration-300 hover:text-white ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${index * 55}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
