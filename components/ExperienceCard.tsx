import Image from "next/image";

type ExperienceCardProps = {
  ImagePath?: string;
  ImageAlt?: string;
  JobPosition: string;
  Company: string;
  Duration: string;
  location?: string;
};

export default function ExperienceCard({
  ImagePath,
  ImageAlt,
  JobPosition,
  Company,
  Duration,
  location,
}: ExperienceCardProps) {
  return (
    <article className="timeline-card relative rounded-[1.7rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(12,15,24,0.74),rgba(8,10,18,0.88)_100%)] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.14)] lg:px-6 lg:py-6">
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className="flex items-start gap-4">
          <div className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[1.2rem] border border-white/[0.07] bg-white/[0.04]">
            {ImagePath ? (
              <Image
                className="rounded-[0.95rem] object-cover"
                src={ImagePath}
                width={44}
                height={44}
                alt={ImageAlt ?? `${Company} logo`}
                sizes="44px"
              />
            ) : (
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[0.95rem] bg-white/[0.03] text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                {Company
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#9aa5d6]">{Company}</p>
              <h3 className="chrome-text mt-2 max-w-[16ch] text-[1rem] font-semibold leading-[0.95] tracking-[-0.045em] lg:max-w-none lg:text-[1.4rem]">
                {JobPosition}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-4 text-[0.74rem] font-medium uppercase tracking-[0.22em] text-[#c4cade] lg:flex-row lg:items-center lg:justify-between">
          <p>{Duration}</p>
          {location ? (
            <span className="inline-flex items-center gap-2 text-[#b9c2d6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#7dd3fc_0%,#c084fc_100%)]" />
              {location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
