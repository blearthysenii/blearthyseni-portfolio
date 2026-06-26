import type { Locale } from "./types";

export const dictionaries = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
  },
  al: {
    nav: {
      about: "Rreth meje",
      skills: "Aftesite",
      projects: "Projektet",
      experience: "Eksperienca",
      contact: "Kontakti",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}