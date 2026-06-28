import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function ResumePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden bg-[#050505] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[794px] overflow-hidden">
          {/* Download button - Desktop only */}
          <div className="resume-toolbar-rise mb-5 hidden justify-end md:flex">
            <a
              href="/resume/eng.pdf"
              download="Bleart_Hyseni_Resume.pdf"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              Download PDF
            </a>
          </div>

          {/* Mobile: Safari iPhone does not render PDF iframe reliably */}
          <div className="resume-paper-rise block md:hidden">
            <a
              href="/resume/eng.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-neutral-950 px-6 text-center text-white transition hover:bg-neutral-900"
            >
              <span className="text-lg font-semibold">Open Resume</span>
              <span className="mt-2 text-sm text-white/60">
                Tap here to open the PDF
              </span>
            </a>
          </div>

          {/* Desktop / tablet */}
          <iframe
            src="/resume/eng.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width"
            title="Bleart Hyseni Resume"
            className="resume-paper-rise hidden w-full max-w-full border-0 md:block"
            style={{
              height: "1123px",
            }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
