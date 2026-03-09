import { useState } from "react";
import { use2048 } from "@/hooks/use2048";
import { type GameMode } from "@/lib/gameMode";
import StarBackground from "@/components/StarBackground";
import GameBoard from "@/components/GameBoard";
import WinScreen from "@/components/WinScreen";
import LoseScreen from "@/components/LoseScreen";
import ModeSelect from "@/components/ModeSelect";
import ArrowControls from "@/components/ArrowControls";

export default function Index() {
  const [mode, setMode] = useState<GameMode | null>(null);
  const { tiles, score, bestScore, status, move, restart, keepPlaying } = use2048();

  if (!mode) {
    return <ModeSelect onSelect={(m) => { setMode(m); restart(); }} />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ background: "hsl(var(--galaxy-deep))" }}
    >
      <StarBackground />

      <div className="relative z-10 w-full max-w-[480px] px-4 pt-8 pb-10 flex flex-col items-center gap-5">

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-5xl font-black tracking-tight glow-text leading-none"
            style={{ color: "hsl(var(--galaxy-glow))" }}
          >
            2048
          </h1>
          <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
            Galaxy Edition 🌌
          </p>
        </div>

        {/* Score Row */}
        <div className="flex gap-3 w-full justify-center">
          <ScoreCard label="Score" value={score} glow />
          <ScoreCard label="Best" value={bestScore} />
          <button
            onClick={restart}
            className="score-card px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            style={{ color: "hsl(var(--galaxy-glow))" }}
          >
            <span>↺</span> New
          </button>
          <button
            onClick={() => setMode(null)}
            className="score-card px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <span>◂</span> Mode
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
          {mode === "rainbow"
            ? "Arrow keys or swipe to move tiles · Merge matching tiles!"
            : "Swipe or arrow keys · Match colors to climb the rainbow!"}
        </p>

        {/* Board */}
        <GameBoard tiles={tiles} mode={mode} />

        {/* Arrow controls */}
        <ArrowControls onMove={move} />

        {/* Hint */}
        <p className="text-xs text-center" style={{ color: "hsl(260,30%,40%)" }}>
          {mode === "rainbow"
            ? <>Reach <span style={{ color: "hsl(var(--galaxy-glow))" }}>2048</span> to win the galaxy 🚀</>
            : <>Merge your way to the <span style={{ color: "hsl(var(--galaxy-glow))" }}>galaxy color</span> 🌈</>}
        </p>
      </div>

      {status === "won" && (
        <WinScreen score={score} onKeepPlaying={keepPlaying} onRestart={restart} />
      )}
      {status === "lost" && (
        <LoseScreen score={score} bestScore={bestScore} onRestart={restart} />
      )}
    </div>
  );
}

function ScoreCard({ label, value, glow }: { label: string; value: number; glow?: boolean }) {
  return (
    <div className="score-card rounded-xl px-4 py-2 text-center min-w-[80px]">
      <p className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</p>
      <p
        className={`text-xl font-black leading-tight ${glow ? "glow-text" : ""}`}
        style={{ color: glow ? "hsl(var(--galaxy-glow))" : "hsl(var(--galaxy-sparkle))" }}
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}
