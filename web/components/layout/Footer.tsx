import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-white/10">
      <Container>
        <div className="flex flex-col gap-3 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bleart Hyseni. All rights reserved.</p>
          <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}