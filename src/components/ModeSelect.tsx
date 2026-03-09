import { GAME_MODES, type GameMode } from "@/lib/gameMode";
import StarBackground from "./StarBackground";

interface Props {
  onSelect: (mode: GameMode) => void;
}

// Preview color swatches for Pure Colors mode
const PREVIEW_COLORS = [
  "hsl(0,85%,55%)", "hsl(30,100%,55%)", "hsl(50,100%,50%)",
  "hsl(130,60%,45%)", "hsl(210,85%,55%)", "hsl(250,65%,55%)", "hsl(285,75%,60%)",
];

// Preview creatures for Magical mode
const PREVIEW_CREATURES = ["🥚", "⭐", "🦋", "🧚", "🦄", "🐉", "🌟", "✨"];

export default function ModeSelect({ onSelect }: Props) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--galaxy-deep))" }}
    >
      <StarBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-[480px] w-full">
        {/* Title */}
        <div className="text-center">
          <h1
            className="text-5xl font-black tracking-tight glow-text leading-none"
            style={{ color: "hsl(var(--galaxy-glow))" }}
          >
            Kaylee's 2048
          </h1>
          <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
            Galaxy Edition 🌌
          </p>
          <p className="text-sm mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Choose your mode
          </p>
        </div>

        {/* Mode cards */}
        <div className="flex flex-col gap-4 w-full">
          {GAME_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              className="group board-glass rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                borderColor: "hsl(var(--board-border) / 0.6)",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Preview */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{
                    background: "hsl(var(--board-cell))",
                    boxShadow: "0 0 20px hsl(var(--galaxy-glow) / 0.2)",
                  }}
                >
                  {mode.id === "rainbow" ? (
                    <span className="font-black glow-text" style={{ color: "hsl(var(--galaxy-glow))", fontSize: "1.5rem" }}>
                      2048
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-0.5 p-1">
                      {PREVIEW_COLORS.map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            background: color,
                            boxShadow: `0 0 6px ${color.replace(")", ",0.6)")}`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{mode.emoji}</span>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {mode.label}
                    </h3>
                  </div>
                  <p
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {mode.description}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="text-lg transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
