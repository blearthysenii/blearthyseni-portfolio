export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") {
    return false;
  }

  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  const scrollPaddingTop =
    Number.parseFloat(
      window.getComputedStyle(document.documentElement).scrollPaddingTop,
    ) || 0;
  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = Math.min(
    Math.max(target.getBoundingClientRect().top + startY - scrollPaddingTop, 0),
    maxY,
  );
  const distance = targetY - startY;

  if (
    Math.abs(distance) < 1 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return true;
  }

  window.scrollTo({ top: targetY, behavior: "smooth" });
  return true;
}
