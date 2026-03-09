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
    <div className="score-card-magical rounded-2xl px-3 py-4 flex flex-col items-center gap-0.5 min-w-[120px]">
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "hsl(280,60%,50%)" }}>
        ✨ Evolution ✨
      </p>
      {CHAIN.map((c, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-lg leading-none">{c.emoji}</span>
            <span className="text-[9px] leading-tight" style={{ color: "hsl(260,30%,45%)" }}>{c.name}</span>
          </div>
          {i < CHAIN.length - 1 && (
            <span className="text-[8px] leading-none my-[-1px]" style={{ color: "hsl(280,50%,70%)" }}>▼</span>
          )}
        </div>
      ))}
    </div>
  );
}
