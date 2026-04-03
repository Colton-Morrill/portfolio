import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function SectionShell({
  children,
  className,
  id,
}: SectionShellProps) {
  return (
    <div
      id={id}
      className={cn(
        "section-shell",
        className
      )}
    >
      {children}
    </div>
  );
}
