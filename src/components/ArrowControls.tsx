import { type Direction } from "@/hooks/use2048";

interface Props {
  onMove: (dir: Direction) => void;
}

export default function ArrowControls({ onMove }: Props) {
  const btn = (dir: Direction, label: string) => (
    <button
      onPointerDown={(e) => { e.preventDefault(); onMove(dir); }}
      className="score-card w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all active:scale-90 hover:scale-110 select-none touch-none"
      style={{ color: "hsl(var(--galaxy-glow))" }}
      aria-label={dir}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-1">
      <div>{btn("up", "▲")}</div>
      <div className="flex gap-1">
        {btn("left", "◀")}
        {btn("down", "▼")}
        {btn("right", "▶")}
      </div>
    </div>
  );
}
