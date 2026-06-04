import React, { useRef, useState } from "react";

interface TiltHoverProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
}

export default function TiltHover({
  children,
  className = "",
  maxTilt = 8,
}: TiltHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    
    // Relative coordinates inside container between -0.5 and 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Y mouse movement rotates around X axis, and X mouse movement rotates around Y axis
    setRotate({
      x: -y * maxTilt, // pitch
      y: x * maxTilt,  // yaw
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const shadowGlowStyle = isHovered
    ? "shadow-[0_20px_50px_rgba(0,229,255,0.25)] border-[var(--theme-color)]/30"
    : "shadow-[0_10px_35px_rgba(0,0,0,0.5)] border-white/10";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 ${shadowGlowStyle} ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="transition-transform duration-200 ease-out h-full w-full"
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.025)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
