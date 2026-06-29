import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function CVPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden bg-[#050505] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[794px] overflow-hidden">
          <div className="resume-toolbar-rise mb-5 hidden justify-end md:flex">
            <a
              href="/resume/alb.pdf"
              download="Bleart_Hyseni_CV.pdf"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              Shkarko PDF
            </a>
          </div>

          <div className="resume-paper-rise block md:hidden">
            <a
              href="/resume/alb.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-reflection-card relative flex min-h-[360px] w-full overflow-hidden rounded-[30px] border border-[#a9794d]/45 bg-white/[0.04] px-6 text-center text-white shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition active:scale-[0.99]"
            >
              <span className="resume-gradient-shift absolute -inset-8 bg-[radial-gradient(circle_at_8%_10%,rgba(180,113,45,0.66),rgba(28,19,14,0.42)_36%,rgba(8,9,13,0.9)_72%)]" />
              <span className="resume-gradient-shift absolute -inset-8 bg-[radial-gradient(circle_at_92%_92%,rgba(169,100,39,0.58),rgba(18,15,15,0.25)_38%,rgba(5,5,8,0)_72%)] [animation-delay:-3s]" />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_42%,rgba(255,255,255,0.08)_100%)]" />
              <span className="absolute inset-[1px] rounded-[29px] border border-white/12 bg-black/10" />

              <span className="relative z-10 flex w-full flex-col items-center justify-center">
                <span className="text-[1.55rem] font-bold leading-tight tracking-tight text-white/90 drop-shadow-[0_3px_16px_rgba(0,0,0,0.65)]">
                  Hape CV-në
                </span>
                <span className="mt-4 text-base font-medium text-white/45 drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
                  Preke këtu për ta hapur PDF-in
                </span>
              </span>
            </a>
          </div>

          <iframe
            src="/resume/alb.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width"
            title="Bleart Hyseni CV"
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
