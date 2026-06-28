"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_PREFIX = "bleart-scroll:";

function getScrollKey() {
  return `${STORAGE_PREFIX}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function saveScrollPosition() {
  try {
    sessionStorage.setItem(getScrollKey(), String(window.scrollY));
  } catch {
    // Ignore private browsing or storage restrictions.
  }
}

function readScrollPosition() {
  try {
    const value = sessionStorage.getItem(getScrollKey());
    return value ? Number.parseFloat(value) : null;
  } catch {
    return null;
  }
}

function restoreScrollPosition(top: number) {
  const root = document.documentElement;
  const previousRootBehavior = root.style.scrollBehavior;
  const previousBodyBehavior = document.body.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  window.scrollTo(0, top);

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previousRootBehavior;
    document.body.style.scrollBehavior = previousBodyBehavior;
  });
}

export function ScrollRestoration() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const storedY = readScrollPosition();

    if (storedY === null) {
      return;
    }

    restoreScrollPosition(storedY);

    window.setTimeout(() => {
      restoreScrollPosition(storedY);
    }, 120);
  }, [pathname]);

  useEffect(() => {
    let frame: number | null = null;

    const handleScroll = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        saveScrollPosition();
        frame = null;
      });
    };

    const handlePageHide = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }

      saveScrollPosition();
    };

    saveScrollPosition();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      saveScrollPosition();
    };
  }, [pathname]);

  return null;
}
