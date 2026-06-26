import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#050505]">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-black dark:text-white"
        >
          Bleart Hyseni
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}