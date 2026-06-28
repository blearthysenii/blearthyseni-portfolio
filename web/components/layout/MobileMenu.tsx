"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import { scrollToSection } from "../../lib/scrollToSection";

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

export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homePath = `/${locale}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    setOpen(false);

    if (pathname.replace(/\/$/, "") !== homePath) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `${homePath}#${sectionId}`);
    window.setTimeout(() => scrollToSection(sectionId), 40);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:bg-white/[0.08] lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] bg-black/45 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <nav
          className={`mx-3 mt-3 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-[#080808]/95 p-3 text-white shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
          onClick={(event) => event.stopPropagation()}
      >
          <div className="flex flex-col">
          {links[locale].map((item, index) => (
            <Link
              key={item.id}
              href={`/${locale}#${item.id}`}
              onClick={(event) => handleLinkClick(event, item.id)}
                className={`rounded-2xl px-4 py-4 text-lg font-medium text-neutral-200 transition-all duration-300 hover:bg-white/[0.04] hover:text-white ${
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
        </nav>
      </div>
    </>
  );
}
