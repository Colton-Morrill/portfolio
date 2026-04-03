import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ArrowUpRight, Mail } from "lucide-react";

import SectionShell from "@/components/home/SectionShell";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-reveal section-reveal relative flex h-full flex-1"
    >
      <SectionShell className="contact-shell relative z-[2] flex h-full flex-1 flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10 xl:px-16">
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="contact-card-shell relative z-[2] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.042),rgba(255,255,255,0.016)_18%,rgba(4,6,14,0.8)_100%)] px-5 py-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:px-7 lg:px-8 lg:py-8">
            <div className="pointer-events-none absolute inset-0 opacity-[0.7] [mask-image:radial-gradient(80%_72%_at_50%_46%,black,transparent_100%)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(58%_52%_at_50%_38%,black,transparent_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_1px,transparent_1px)] bg-[size:22px_22px]" />
            </div>
            <div className="pointer-events-none absolute left-[-6%] top-[-8%] h-52 w-52 rounded-full bg-cyan-400/[0.12] blur-[84px]" />
            <div className="pointer-events-none absolute right-[-4%] top-[10%] h-60 w-60 rounded-full bg-indigo-500/[0.16] blur-[96px]" />
            <div className="pointer-events-none absolute bottom-[-10%] left-1/2 h-44 w-[56%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(91,104,255,0.18)_0%,rgba(34,211,238,0.12)_36%,transparent_74%)] blur-[74px]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.26)_0%,rgba(5,8,18,0.1)_22%,rgba(5,8,18,0.34)_100%)]" />

            <div className="relative z-[2] grid min-h-[44vh] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="section-kicker text-[0.76rem] font-semibold uppercase tracking-[0.38em] text-[#99a4d6]">
                  Contact
                </p>
                <h3 className="section-title chrome-text mt-3 max-w-[10ch] text-[clamp(2.35rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
                  Let&apos;s build something that&apos;s not generic.
                </h3>
              </div>

              <div className="lg:justify-self-end">
                <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(5,8,18,0.76),rgba(5,8,18,0.92))] p-5 backdrop-blur-xl lg:p-6">
                  <a
                    className="group inline-flex items-center gap-4 text-[1.02rem] font-semibold leading-7 text-[#f5efff] transition hover:text-cyan-200 lg:text-[1.08rem]"
                    href="mailto:cjmorrill@gmail.com"
                  >
                    <Mail className="h-5 w-5" />
                    cjmorrill@gmail.com
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-[#b8bfd3]">
                    Open to frontend, product UI, and design-engineering work where quality and speed both matter.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <a
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#eef1fb] transition hover:border-cyan-300/30 hover:text-cyan-200"
                      href="https://www.linkedin.com/in/colton-morrill-0b0aa4187/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="w-4" />
                    </a>
                    <a
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#eef1fb] transition hover:border-cyan-300/30 hover:text-cyan-200"
                      href="https://github.com/Colton-Morrill"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[2] mx-auto mt-6 flex w-full max-w-5xl flex-col gap-2 text-left lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.95rem] leading-7 text-[#c8cfdf]">
            © <span id="year"></span> Colton Morrill
          </p>
          <p className="text-[0.88rem] leading-7 text-[#9fa9bf]">
            Built with{" "}
            <a
              className="text-[#c9d7ff] transition hover:text-cyan-200"
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              className="text-[#c9d7ff] transition hover:text-cyan-200"
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind
            </a>
            .
          </p>
        </div>
      </SectionShell>
    </section>
  );
}
