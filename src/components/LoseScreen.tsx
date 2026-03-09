interface Props {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

export default function LoseScreen({ score, bestScore, onRestart }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        style={{ background: "hsl(255,35%,5%,0.75)", backdropFilter: "blur(6px)" }}
      />
      <div
        className="relative z-10 rounded-3xl p-8 text-center animate-overlay-in"
        style={{
          background: "hsl(255,40%,8%,0.95)",
          backdropFilter: "blur(20px)",
          border: "2px solid hsl(260,50%,30%,0.5)",
          boxShadow: "0 0 40px hsl(260,60%,20%,0.5)",
          maxWidth: 340,
        }}
      >
        <div className="text-6xl mb-3 animate-float">🌌</div>
        <h2
          className="text-3xl font-black mb-2"
          style={{ color: "hsl(270,80%,85%)" }}
        >
          Game Over!
        </h2>
        <p className="text-sm mb-1" style={{ color: "hsl(260,50%,65%)" }}>
          The galaxy board is full!
        </p>
        <div className="flex gap-4 justify-center my-4">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest" style={{ color: "hsl(260,40%,55%)" }}>Score</p>
            <p className="text-2xl font-black glow-text" style={{ color: "hsl(280,100%,80%)" }}>
              {score.toLocaleString()}
            </p>
          </div>
          <div className="w-px" style={{ background: "hsl(260,40%,25%)" }} />
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest" style={{ color: "hsl(260,40%,55%)" }}>Best</p>
            <p className="text-2xl font-black" style={{ color: "hsl(200,80%,70%)" }}>
              {bestScore.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="text-sm mb-5" style={{ color: "hsl(280,60%,75%)" }}>
          ✨ Every master was once a beginner. Try again!
        </p>

        <button
          onClick={onRestart}
          className="w-full py-3 rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg,hsl(280,80%,55%),hsl(200,80%,55%))",
            color: "#fff",
            boxShadow: "0 0 24px hsl(280,80%,55%,0.5)",
          }}
        >
          Try Again! 🚀
        </button>
      </div>
    </div>
  );
}
