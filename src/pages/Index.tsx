import { useState } from "react";
import { use2048 } from "@/hooks/use2048";
import { type GameMode } from "@/lib/gameMode";
import StarBackground from "@/components/StarBackground";
import CloudBackground from "@/components/CloudBackground";
import GameBoard from "@/components/GameBoard";
import WinScreen from "@/components/WinScreen";
import LoseScreen from "@/components/LoseScreen";
import ModeSelect from "@/components/ModeSelect";
import ArrowControls from "@/components/ArrowControls";
import CreatureGuide from "@/components/CreatureGuide";

export default function Index() {
  const [mode, setMode] = useState<GameMode | null>(null);
  const { tiles, score, bestScore, status, move, restart, keepPlaying } = use2048();

  if (!mode) {
    return <ModeSelect onSelect={(m) => { setMode(m); restart(); }} />;
  }

  const isMagical = mode === "magical";
  const bgStyle = isMagical
    ? { background: "transparent" }
    : { background: "hsl(var(--galaxy-deep))" };
  const textColor = isMagical ? "hsl(260,40%,30%)" : "hsl(var(--muted-foreground))";
  const titleColor = isMagical ? "hsl(280,60%,50%)" : "hsl(var(--galaxy-glow))";
  const hintColor = isMagical ? "hsl(260,30%,55%)" : "hsl(260,30%,40%)";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={bgStyle}
    >
      {isMagical ? <CloudBackground /> : <StarBackground />}

      <div className="relative z-10 w-full max-w-[480px] px-4 pt-8 pb-10 flex flex-col items-center gap-5">

        {/* Title */}
        <div className="text-center">
          <h1
            className={`text-5xl font-black tracking-tight leading-none ${isMagical ? "" : "glow-text"}`}
            style={{ color: titleColor }}
          >
            Kaylee's 2048
          </h1>
          <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: textColor }}>
            {isMagical ? "Magical Creatures ✨" : "Galaxy Edition 🌌"}
          </p>
        </div>

        {/* Score Row */}
        <div className="flex gap-3 w-full justify-center">
          <ScoreCard label="Score" value={score} glow magical={isMagical} />
          <ScoreCard label="Best" value={bestScore} magical={isMagical} />
          <button
            onClick={restart}
            className={`${isMagical ? "score-card-magical" : "score-card"} px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5`}
            style={{ color: titleColor }}
          >
            <span>↺</span> New
          </button>
          <button
            onClick={() => setMode(null)}
            className={`${isMagical ? "score-card-magical" : "score-card"} px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5`}
            style={{ color: textColor }}
          >
            <span>◂</span> Mode
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs text-center" style={{ color: textColor }}>
          {mode === "rainbow"
            ? "Arrow keys or swipe to move tiles · Merge matching tiles!"
            : mode === "magical"
            ? "Swipe or arrow keys · Merge creatures to evolve them! ✨"
            : "Swipe or arrow keys · Match colors to climb the rainbow!"}
        </p>

        {/* Board */}
        <GameBoard tiles={tiles} mode={mode} />

        {/* Arrow controls */}
        <ArrowControls onMove={move} />

        {/* Hint */}
        <p className="text-xs text-center" style={{ color: hintColor }}>
          {mode === "rainbow"
            ? <>Reach <span style={{ color: titleColor }}>2048</span> to win the galaxy 🚀</>
            : mode === "magical"
            ? <>Evolve your creatures to reach the <span style={{ color: titleColor }}>Galaxy Guardian</span> 🌌</>
            : <>Merge your way to the <span style={{ color: titleColor }}>galaxy color</span> 🌈</>}
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

function ScoreCard({ label, value, glow, magical }: { label: string; value: number; glow?: boolean; magical?: boolean }) {
  return (
    <div className={`${magical ? "score-card-magical" : "score-card"} rounded-xl px-4 py-2 text-center min-w-[80px]`}>
      <p className="text-[10px] uppercase tracking-widest" style={{ color: magical ? "hsl(260,30%,55%)" : "hsl(var(--muted-foreground))" }}>{label}</p>
      <p
        className={`text-xl font-black leading-tight ${glow && !magical ? "glow-text" : ""}`}
        style={{ color: magical ? "hsl(280,60%,50%)" : glow ? "hsl(var(--galaxy-glow))" : "hsl(var(--galaxy-sparkle))" }}
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}
