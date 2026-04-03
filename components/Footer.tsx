export default function Footer() {
  return (
    <footer className="relative z-[2] pt-0 pb-10">
      <div className="section-shell">
        <div className="flex flex-col gap-2 pt-5 text-left lg:flex-row lg:items-center lg:justify-between">
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
      </div>
    </footer>
  );
}
