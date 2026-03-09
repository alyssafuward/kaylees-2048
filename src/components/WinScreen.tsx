import { useEffect, useRef } from "react";

interface Props {
  score: number;
  onKeepPlaying: () => void;
  onRestart: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  hue: number;
  size: number;
  shape: "circle" | "star" | "diamond";
}

export default function WinScreen({ score, onKeepPlaying, onRestart }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Burst particles from center
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particlesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 4,
        alpha: 1,
        hue: Math.random() * 360,
        size: Math.random() * 10 + 4,
        shape: (["circle", "star", "diamond"] as const)[Math.floor(Math.random() * 3)],
      });
    }

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.4;
        const px = x + Math.cos(angle) * rad;
        const py = y + Math.sin(angle) * rad;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particlesRef.current) {
        if (p.alpha <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.alpha -= 0.012;
        p.vx *= 0.99;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = `hsl(${p.hue},100%,65%)`;
        ctx.shadowColor = `hsl(${p.hue},100%,65%)`;
        ctx.shadowBlur = 8;
        ctx.translate(p.x, p.y);

        if (p.shape === "star") {
          drawStar(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.shape === "diamond") {
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive) rafRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div
        className="relative z-10 rounded-3xl p-8 text-center animate-overlay-in"
        style={{
          background: "hsl(260,50%,8%,0.92)",
          backdropFilter: "blur(20px)",
          border: "2px solid hsl(280,80%,65%,0.5)",
          boxShadow: "0 0 60px hsl(280,100%,60%,0.4), 0 0 120px hsl(280,100%,60%,0.15)",
          maxWidth: 360,
        }}
      >
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-3xl animate-pulse-ring pointer-events-none"
          style={{ border: "2px solid hsl(280,80%,65%,0.3)" }}
        />

        <div className="text-6xl mb-3 animate-float">🏆</div>
        <h2
          className="text-4xl font-black mb-2 glow-text"
          style={{ color: "hsl(280,100%,80%)" }}
        >
          You Win!
        </h2>
        <p className="text-lg mb-1" style={{ color: "hsl(270,80%,85%)" }}>
          You reached <span className="font-black" style={{ color: "hsl(280,100%,75%)" }}>2048</span>!
        </p>
        <p className="text-sm mb-6" style={{ color: "hsl(260,50%,70%)" }}>
          Score: <span className="font-bold" style={{ color: "hsl(280,100%,80%)" }}>{score.toLocaleString()}</span>
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onKeepPlaying}
            className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: "hsl(270,70%,35%)",
              color: "hsl(270,80%,90%)",
              border: "1px solid hsl(270,60%,50%,0.5)",
            }}
          >
            Keep Playing
          </button>
          <button
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,hsl(280,80%,55%),hsl(200,80%,55%))",
              color: "#fff",
              boxShadow: "0 0 20px hsl(280,80%,55%,0.5)",
            }}
          >
            New Game 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
