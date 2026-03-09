import { Tile } from "@/hooks/use2048";
import { useEffect, useState } from "react";
import { type GameMode, getPureColor, getMagicalCreature } from "@/lib/gameMode";

// Tile color map for Rainbow Numbers mode
const TILE_COLORS: Record<number, { bg: string; shadow: string; text: string }> = {
  2:    { bg: "hsl(0,90%,60%)",    shadow: "0 0 18px hsl(0,90%,60%,0.7)",    text: "#fff" },
  4:    { bg: "hsl(25,100%,58%)",  shadow: "0 0 18px hsl(25,100%,58%,0.7)",  text: "#fff" },
  8:    { bg: "hsl(48,100%,52%)",  shadow: "0 0 18px hsl(48,100%,52%,0.7)",  text: "#1a1a00" },
  16:   { bg: "hsl(120,60%,45%)",  shadow: "0 0 18px hsl(120,60%,45%,0.7)",  text: "#fff" },
  32:   { bg: "hsl(210,90%,58%)",  shadow: "0 0 18px hsl(210,90%,58%,0.7)",  text: "#fff" },
  64:   { bg: "hsl(240,70%,62%)",  shadow: "0 0 18px hsl(240,70%,62%,0.7)",  text: "#fff" },
  128:  { bg: "hsl(270,80%,65%)",  shadow: "0 0 18px hsl(270,80%,65%,0.7)",  text: "#fff" },
  256:  { bg: "hsl(0,90%,60%)",    shadow: "0 0 24px hsl(0,90%,60%,0.8)",    text: "#fff" },
  512:  { bg: "hsl(25,100%,58%)",  shadow: "0 0 24px hsl(25,100%,58%,0.8)",  text: "#fff" },
  1024: { bg: "hsl(48,100%,52%)",  shadow: "0 0 24px hsl(48,100%,52%,0.8)",  text: "#1a1a00" },
  2048: { bg: "linear-gradient(135deg,hsl(280,100%,68%),hsl(180,100%,60%))",
          shadow: "0 0 40px hsl(280,100%,68%,0.9), 0 0 80px hsl(180,100%,60%,0.5)", text: "#fff" },
};

function getRainbowColor(value: number) {
  if (TILE_COLORS[value]) return TILE_COLORS[value];
  const cycle = [
    TILE_COLORS[2], TILE_COLORS[4], TILE_COLORS[8], TILE_COLORS[16],
    TILE_COLORS[32], TILE_COLORS[64], TILE_COLORS[128],
  ];
  const idx = Math.floor(Math.log2(value)) % cycle.length;
  return cycle[idx];
}

function getFontSize(value: number): string {
  if (value < 100)   return "clamp(1.6rem, 5vw, 2.2rem)";
  if (value < 1000)  return "clamp(1.2rem, 4vw, 1.8rem)";
  if (value < 10000) return "clamp(0.9rem, 3vw, 1.3rem)";
  return "clamp(0.7rem, 2.5vw, 1rem)";
}

interface Props {
  tile: Tile;
  cellSize: number;
  gap: number;
  mode: GameMode;
}

export default function GameTile({ tile, cellSize, gap, mode }: Props) {
  const [animClass, setAnimClass] = useState("");
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (tile.isMerged) {
      setAnimClass("animate-tile-merge");
      if (mode === "magical") {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 600);
      }
    } else if (tile.isNew) {
      setAnimClass("animate-tile-new");
    }
    const t = setTimeout(() => setAnimClass(""), 600);
    return () => clearTimeout(t);
  }, [tile.isMerged, tile.isNew, tile.id, mode]);

  const isRainbow = mode === "rainbow";
  const isMagical = mode === "magical";
  
  const rainbow = getRainbowColor(tile.value);
  const pure = getPureColor(tile.value);
  const magical = getMagicalCreature(tile.value);
  
  const bg = isRainbow ? rainbow.bg : isMagical ? magical.bg : pure.bg;
  const shadow = isRainbow ? rainbow.shadow : isMagical ? `0 0 20px ${magical.glow}, 0 0 40px ${magical.glow.replace(")", ",0.5)")}` : pure.shadow;
  const text = isRainbow ? rainbow.text : "transparent";
  const border = isMagical ? `3px solid ${magical.glow}` : "none";

  const x = tile.col * (cellSize + gap) + gap;
  const y = tile.row * (cellSize + gap) + gap;

  return (
    <>
      <div
        className={`absolute flex items-center justify-center rounded-xl font-black select-none ${animClass}`}
        style={{
          width: cellSize,
          height: cellSize,
          left: x,
          top: y,
          background: bg,
          boxShadow: shadow,
          border,
          color: text,
          fontSize: isRainbow ? getFontSize(tile.value) : isMagical ? `${cellSize * 0.55}px` : 0,
          letterSpacing: "-0.02em",
          transition: "left 0.12s ease, top 0.12s ease",
          zIndex: tile.isMerged ? 10 : 5,
          textShadow: isRainbow ? "0 1px 4px rgba(0,0,0,0.4)" : "none",
          willChange: "transform",
        }}
      >
        {isRainbow ? tile.value : isMagical ? magical.emoji : null}
      </div>
      
      {/* Sparkle burst animation for magical mode */}
      {showSparkles && isMagical && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: cellSize,
            height: cellSize,
            left: x,
            top: y,
            zIndex: 15,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const distance = cellSize * 0.8;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            return (
              <div
                key={i}
                className="absolute animate-sparkle-burst"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "8px",
                  height: "8px",
                  marginLeft: "-4px",
                  marginTop: "-4px",
                  animation: `sparkle-burst 0.6s ease-out forwards`,
                  animationDelay: `${i * 0.02}s`,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                } as React.CSSProperties}
              >
                ✨
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
