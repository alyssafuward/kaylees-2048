export type GameMode = "rainbow" | "purecolor";

export interface GameModeConfig {
  id: GameMode;
  label: string;
  description: string;
  emoji: string;
  showNumbers: boolean;
}

export const GAME_MODES: GameModeConfig[] = [
  {
    id: "rainbow",
    label: "Rainbow Numbers",
    description: "Classic 2048 with bold rainbow-colored numbers",
    emoji: "🔢",
    showNumbers: true,
  },
  {
    id: "purecolor",
    label: "Pure Colors",
    description: "No numbers — merge colors up the rainbow chain!",
    emoji: "🎨",
    showNumbers: false,
  },
];

// Rainbow color chain for Pure Colors mode (maps tile value to color)
const PURE_COLOR_CHAIN: { value: number; color: string; name: string }[] = [
  { value: 2,    color: "hsl(0,85%,55%)",    name: "Red" },
  { value: 4,    color: "hsl(30,100%,55%)",   name: "Orange" },
  { value: 8,    color: "hsl(50,100%,50%)",   name: "Yellow" },
  { value: 16,   color: "hsl(130,60%,45%)",   name: "Green" },
  { value: 32,   color: "hsl(210,85%,55%)",   name: "Blue" },
  { value: 64,   color: "hsl(250,65%,55%)",   name: "Indigo" },
  { value: 128,  color: "hsl(285,75%,60%)",   name: "Violet" },
  // Brighter cycle
  { value: 256,  color: "hsl(0,95%,68%)",     name: "Light Red" },
  { value: 512,  color: "hsl(30,100%,68%)",   name: "Light Orange" },
  { value: 1024, color: "hsl(50,100%,65%)",   name: "Light Yellow" },
  { value: 2048, color: "linear-gradient(135deg,hsl(280,100%,72%),hsl(180,100%,65%))", name: "Galaxy" },
];

export function getPureColor(value: number): { bg: string; shadow: string } {
  const entry = PURE_COLOR_CHAIN.find(c => c.value === value);
  if (entry) {
    const isGradient = entry.color.startsWith("linear");
    return {
      bg: entry.color,
      shadow: isGradient
        ? "0 0 40px hsl(280,100%,68%,0.9), 0 0 80px hsl(180,100%,60%,0.5)"
        : `0 0 22px ${entry.color.replace(")", ",0.7)")}`,
    };
  }
  // Beyond 2048 — cycle through brighter pastels
  const idx = Math.floor(Math.log2(value)) % 7;
  const hues = [0, 30, 50, 130, 210, 250, 285];
  const hue = hues[idx];
  const bg = `hsl(${hue},100%,78%)`;
  return { bg, shadow: `0 0 28px hsl(${hue},100%,78%,0.7)` };
}
