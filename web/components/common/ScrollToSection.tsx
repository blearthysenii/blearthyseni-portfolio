"use client";

import { useEffect } from "react";

export function ScrollToSection({ id }: { id: string }) {
  useEffect(() => {
    const scroll = () => {
      const element = document.getElementById(id);

      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top: y,
        behavior: "auto",
      });
    };

    requestAnimationFrame(scroll);
  }, [id]);

  return null;
}