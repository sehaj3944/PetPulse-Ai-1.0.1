import React, { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number; // base delay in ms
}

export default function TextReveal({
  text,
  className = "",
  as: Component = "h2",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-40px 0px -40px 0px", // triggers cleanly both scrolling down or up
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block flex-wrap overflow-hidden ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block mr-[0.25em] transition-all cubic-bezier(0.16, 1, 0.3, 1) transform-gpu duration-700"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed 
              ? "translateY(0px) translateZ(0px)" 
              : "translateY(15px) translateZ(0px)",
            filter: isRevealed ? "blur(0px)" : "blur(4px)",
            transitionDelay: `${delay + wordIdx * 50}ms`,
            // Add slight text glow during transitions
            textShadow: isRevealed 
              ? "0 0 10px rgba(0,0,0,0)" 
              : "0 0 15px var(--theme-color)",
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
