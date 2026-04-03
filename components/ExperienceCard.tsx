import Image from "next/image";

type ExperienceCardProps = {
  ImagePath?: string;
  ImageAlt?: string;
  JobPosition: string;
  Company: string;
  Duration: string;
  location?: string;
};

const STATE_ICON_STYLES: Record<string, string> = {
  Utah: "from-[#8fb5ff]/85 via-[#9b8cff]/75 to-[#c8b9ff]/70 text-[#ced7ff]",
  Idaho: "from-[#7dd3fc]/85 via-[#7c9cff]/75 to-[#b6d1ff]/70 text-[#d5e5ff]",
  Iowa: "from-[#6ee7b7]/85 via-[#53d4c8]/75 to-[#8fe3f8]/70 text-[#d9fff5]",
};

const STATE_ABBREVIATIONS: Record<string, string> = {
  Utah: "UT",
  Idaho: "ID",
  Iowa: "IA",
};

const STATE_ICON_PATHS: Record<string, { src: string; widthClass: string }> = {
  Utah: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/05/BlankMap-USA-Utah.svg",
    widthClass: "w-[0.78rem]",
  },
  Idaho: {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Blank_Map_of_Idaho.svg",
    widthClass: "w-[0.68rem]",
  },
  Iowa: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Iowa_blank_map2.svg",
    widthClass: "w-[0.98rem]",
  },
};

function getStateIcon(location?: string) {
  if (!location) {
    return null;
  }

  const parts = location.split(",");
  const state = parts.at(-1)?.trim();

  if (!state) {
    return null;
  }

  const icon = STATE_ICON_PATHS[state];

  if (!icon) {
    return null;
  }

  return {
    ...icon,
    abbreviation: STATE_ABBREVIATIONS[state] ?? state.slice(0, 2).toUpperCase(),
    gradient: STATE_ICON_STYLES[state] ?? "from-[#8fb5ff]/85 via-[#9b8cff]/75 to-[#c8b9ff]/70 text-[#ced7ff]",
    state,
  };
}

export default function ExperienceCard({
  ImagePath,
  ImageAlt,
  JobPosition,
  Company,
  Duration,
  location,
}: ExperienceCardProps) {
  const stateIcon = getStateIcon(location);

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
              {stateIcon ? (
                <span
                  className={`inline-flex h-[1.3rem] items-center gap-1 rounded-[0.55rem] bg-gradient-to-br pl-[0.28rem] pr-[0.38rem] shadow-[0_6px_18px_rgba(91,132,255,0.14)] ${stateIcon.gradient}`}
                  aria-hidden="true"
                >
                  <span className={`relative ${stateIcon.widthClass} h-[0.95rem] shrink-0`}>
                    <span
                      className="absolute inset-0 bg-white/80"
                      style={{
                        WebkitMaskImage: `url(${stateIcon.src})`,
                        maskImage: `url(${stateIcon.src})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                    <span
                      className="absolute inset-[1.4px] bg-[#111725]"
                      style={{
                        WebkitMaskImage: `url(${stateIcon.src})`,
                        maskImage: `url(${stateIcon.src})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </span>
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#7dd3fc_0%,#c084fc_100%)]" />
              )}
              {location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
