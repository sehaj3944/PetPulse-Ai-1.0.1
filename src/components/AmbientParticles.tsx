import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface AmbientParticlesProps {
  count?: number;
}

export default function AmbientParticles({ count: initialCount }: AmbientParticlesProps = {}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Detect mobile to limit particle count (improve performance)
    const isMobile = window.innerWidth < 768;
    const count = initialCount ? (isMobile ? Math.floor(initialCount / 3) : initialCount) : (isMobile ? 8 : 24);

    const colors = ["var(--theme-color)", "#4D9FFF", "#AB47BC", "#00E5FF"];
    
    const generatedParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * (isMobile ? 3 : 5) + 1.5, // pixel size
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 20, // 20s to 40s slow float
      delay: Math.random() * -10, // overlap start
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <style>{`
        @keyframes floatAmbientParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.18;
          }
          90% {
            opacity: 0.18;
          }
          100% {
            transform: translateY(-120px) translateX(40px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-[1px] animate-float transition-all"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
            animation: `floatAmbientParticle ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
