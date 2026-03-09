import { useMemo } from "react";

interface Cloud {
  id: number;
  top: string;
  left: string;
  scale: number;
  duration: string;
  delay: string;
  opacity: number;
}

export default function CloudBackground() {
  const clouds = useMemo<Cloud[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 70}%`,
      left: `${-20 + Math.random() * 10}%`,
      scale: 0.6 + Math.random() * 1.2,
      duration: `${35 + Math.random() * 40}s`,
      delay: `${-Math.random() * 40}s`,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dreamy sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(210,75%,78%) 0%, hsl(200,80%,85%) 40%, hsl(270,50%,88%) 100%)",
        }}
      />

      {/* Drifting clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
            animation: `cloud-drift ${cloud.duration} linear infinite`,
            animationDelay: cloud.delay,
          }}
        >
          {/* Cloud shape using layered divs */}
          <div className="relative" style={{ width: "180px", height: "70px" }}>
            <div
              className="absolute rounded-full"
              style={{
                width: "100px",
                height: "70px",
                bottom: 0,
                left: "40px",
                background: "hsla(0,0%,100%,0.9)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "70px",
                height: "55px",
                bottom: "10px",
                left: "10px",
                background: "hsla(0,0%,100%,0.85)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "60px",
                height: "50px",
                bottom: "12px",
                right: "10px",
                background: "hsla(0,0%,100%,0.85)",
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
