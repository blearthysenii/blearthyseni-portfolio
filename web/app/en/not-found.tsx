import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-[#050505]">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          404 Error
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight text-black dark:text-white">
          Page not found
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/en"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}