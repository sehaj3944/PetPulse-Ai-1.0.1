import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactElement;
  strength?: number; // scale multiplier for the effect (default: 0.25 for subtle)
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.22,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    setCoords({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <div
        className="transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: isHovered 
            ? `translate3d(${coords.x}px, ${coords.y}px, 0)` 
            : `translate3d(0px, 0px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
