import React, { useEffect, useState, useRef } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  
  // We use requestAnimationFrame to interpolate and ease cursor position smoothly (lerp)
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    const updatePosition = () => {
      // Linear interpolation: current = current + (target - current) * ease
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.08; // smooth 8% easing speed
      currentPos.current.y += dy * 0.08;

      setPosition({ x: currentPos.current.x, y: currentPos.current.y });
      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden mix-blend-screen hidden md:block"
      style={{ opacity: isVisible ? 0.45 : 0 }}
    >
      <div
        className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{
          left: position.x - 144, // offset center of the 288px aura
          top: position.y - 144,
          background: "radial-gradient(circle, var(--theme-color) 0%, rgba(0, 229, 255, 0.1) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
