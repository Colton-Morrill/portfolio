import Image from "next/image";
import { ExternalLink } from "lucide-react";

type ProjectCardSmallProps = {
  ProjectUrl?: string;
  ImagePath: string;
  ImageAlt: string;
  ProjectName: string;
  ProjectSoftware: string;
};

export default function ProjectCardSmall({
  ProjectUrl,
  ImagePath,
  ImageAlt,
  ProjectName,
  ProjectSoftware,
}: ProjectCardSmallProps) {
  return (
    <a
      href={ProjectUrl}
      className="glass-chip relative flex w-full items-center rounded-2xl p-3 font-bold transition duration-300 hover:border-white/20 hover:text-sky-300 lg:w-1/3"
      target="_blank"
      rel="noreferrer"
    >
      <Image
        className="mr-8 rounded-lg border border-white/10"
        src={ImagePath}
        width={50}
        height={50}
        alt={ImageAlt}
        sizes="50px"
      />
      <div>
        {ProjectName}
        <p className="flex items-center text-sm font-bold text-slate-400">
          {ProjectSoftware}
          {ProjectUrl ? <ExternalLink className="ml-2" size={12} /> : null}
        </p>
      </div>
    </a>
  );
}
