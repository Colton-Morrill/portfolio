type RainbowTextProps = {
  text: string;
  className?: string;
};

export default function RainbowText({
  text,
  className = "",
}: RainbowTextProps) {
  return <span className={`linear-wipe font-bold ${className}`}>{text}</span>;
}
