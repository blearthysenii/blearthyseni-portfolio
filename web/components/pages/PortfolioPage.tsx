import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

type Locale = "en" | "al";

export function PortfolioPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Skills locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Certificates locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer />
    </>
  );
}