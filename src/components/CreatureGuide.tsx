const CHAIN = [
  { emoji: "🥚", name: "Egg" },
  { emoji: "⭐", name: "Star" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🧚", name: "Fairy" },
  { emoji: "🦄", name: "Unicorn" },
  { emoji: "🐉", name: "Dragon" },
  { emoji: "🌟", name: "Giant Star" },
  { emoji: "✨", name: "Constellation" },
  { emoji: "🌈", name: "Rainbow Spirit" },
  { emoji: "🔮", name: "Crystal Oracle" },
  { emoji: "🌌", name: "Galaxy Guardian" },
];

export default function CreatureGuide() {
  return (
    <div className="score-card-magical rounded-2xl px-5 py-5 flex flex-col items-center gap-1 min-w-[190px]">
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(280,60%,50%)" }}>
        ✨ Evolution ✨
      </p>
      {CHAIN.map((c, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <div className="flex items-center gap-3 w-full px-1">
            <span className="text-3xl leading-none">{c.emoji}</span>
            <span className="text-sm font-semibold leading-tight" style={{ color: "hsl(260,30%,45%)" }}>{c.name}</span>
          </div>
          {i < CHAIN.length - 1 && (
            <span className="text-xs leading-none my-0.5" style={{ color: "hsl(280,50%,70%)" }}>▼</span>
          )}
        </div>
      ))}
    </div>
  );
}
