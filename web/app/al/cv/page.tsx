import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function CVPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-[#050505] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto w-[min(calc(100vw-2rem),794px)] sm:w-[min(calc(100vw-3rem),794px)] lg:w-[min(calc(100vw-4rem),794px)]">
          <div className="resume-toolbar-rise mb-5 flex justify-end">
            <a
              href="/resume/alb.pdf"
              download="Bleart_Hyseni_Resume.pdf"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              Shkarko PDF
            </a>
          </div>
          <iframe
            src="/resume/alb.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width"
            title="Bleart Hyseni CV"
            className="resume-paper-rise block aspect-[210/297] w-full max-w-full border-0"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
