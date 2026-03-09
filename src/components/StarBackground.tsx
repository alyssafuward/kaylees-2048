import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  hue: number;
}

const NUM_STARS = 180;

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    starsRef.current = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      hue: Math.random() < 0.3 ? 200 + Math.random() * 60 : 260 + Math.random() * 40,
    }));

    // Add some sparkle "diamond" stars
    const sparkles: Star[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.04 + 0.01,
      hue: 180 + Math.random() * 100,
    }));

    let t = 0;
    function draw() {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.4, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      grad.addColorStop(0, "hsl(265,45%,9%)");
      grad.addColorStop(0.5, "hsl(255,40%,6%)");
      grad.addColorStop(1, "hsl(240,35%,4%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula cloud
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.35
      );
      nebula.addColorStop(0, "hsla(280,70%,30%,0.12)");
      nebula.addColorStop(0.5, "hsla(260,60%,20%,0.07)");
      nebula.addColorStop(1, "transparent");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 0,
        canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.28
      );
      nebula2.addColorStop(0, "hsla(200,80%,25%,0.1)");
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw normal stars
      for (const s of starsRef.current) {
        const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},80%,90%,${alpha})`;
        ctx.fill();
      }

      // Draw sparkle stars (4-pointed)
      for (const s of sparkles) {
        const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed));
        const size = s.r * (0.8 + 0.4 * Math.sin(s.phase + t * s.speed * 0.7));
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(t * s.speed * 0.3);
        ctx.fillStyle = `hsla(${s.hue},100%,90%,${alpha})`;
        ctx.beginPath();
        // 4-pointed star
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const r2 = i % 2 === 0 ? size : size * 0.35;
          const px = Math.cos(angle) * r2;
          const py = Math.sin(angle) * r2;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
