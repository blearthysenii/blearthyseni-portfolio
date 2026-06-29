"use client";

import { usePathname } from "next/navigation";
import { Container } from "../ui/Container";

export function Footer() {
  const pathname = usePathname();
  const isAlbanian = pathname.startsWith("/al");

  return (
    <footer className="border-t border-white/10 py-8">
      <Container>
        <div className="text-center text-sm text-neutral-500">
          <p>
            &copy; 2026 Bleart Hyseni.{" "}
            {isAlbanian
              ? "Të gjitha të drejtat e rezervuara."
              : "All rights reserved."}
          </p>
        </div>
      </Container>
    </footer>
  );
}
