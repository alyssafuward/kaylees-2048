export type GameMode = "rainbow" | "purecolor" | "magical";

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
  {
    id: "magical",
    label: "Magical Creatures",
    description: "Evolve magical beings from eggs to cosmic entities!",
    emoji: "🦄",
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

// Magical Creatures chain for Magical mode
const MAGICAL_CREATURES: { value: number; emoji: string; name: string; glow: string }[] = [
  { value: 2,    emoji: "🥚", name: "Magic Egg",      glow: "hsl(45,100%,70%)" },
  { value: 4,    emoji: "⭐", name: "Baby Star",      glow: "hsl(50,100%,65%)" },
  { value: 8,    emoji: "🦋", name: "Magic Butterfly", glow: "hsl(330,85%,70%)" },
  { value: 16,   emoji: "🧚", name: "Fairy",          glow: "hsl(280,75%,65%)" },
  { value: 32,   emoji: "🦄", name: "Unicorn",        glow: "hsl(300,85%,70%)" },
  { value: 64,   emoji: "🐉", name: "Dragon",         glow: "hsl(140,70%,55%)" },
  { value: 128,  emoji: "🌟", name: "Giant Star",     glow: "hsl(55,100%,70%)" },
  { value: 256,  emoji: "✨", name: "Constellation",  glow: "hsl(210,100%,75%)" },
  { value: 512,  emoji: "🌈", name: "Rainbow Spirit", glow: "hsl(180,100%,70%)" },
  { value: 1024, emoji: "🔮", name: "Crystal Oracle", glow: "hsl(270,80%,75%)" },
  { value: 2048, emoji: "🌌", name: "Galaxy Guardian", glow: "hsl(280,100%,68%)" },
  { value: 4096, emoji: "🪐", name: "Planet Master",  glow: "hsl(30,90%,65%)" },
  { value: 8192, emoji: "☄️", name: "Comet King",     glow: "hsl(15,100%,70%)" },
];

export function getMagicalCreature(value: number): { emoji: string; glow: string; bg: string } {
  const entry = MAGICAL_CREATURES.find(c => c.value === value);
  if (entry) {
    return {
      emoji: entry.emoji,
      glow: entry.glow,
      bg: `${entry.glow.replace(")", ",0.15)")}`,
    };
  }
  // Beyond defined values — cycle through cosmic emojis
  const cosmicEmojis = ["🌠", "💫", "⚡", "🔥", "❄️", "🌊", "🌪️"];
  const idx = Math.floor(Math.log2(value)) % cosmicEmojis.length;
  const hue = (idx * 50) % 360;
  const glow = `hsl(${hue},90%,70%)`;
  return {
    emoji: cosmicEmojis[idx],
    glow,
    bg: `${glow.replace(")", ",0.15)")}`,
  };
}
