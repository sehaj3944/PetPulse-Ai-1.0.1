import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | "fade-up" 
    | "fade-down" 
    | "fade-left" 
    | "fade-right" 
    | "blur-clear" 
    | "scale-up" 
    | "glow-reveal" 
    | "depth-reveal"
    | "cinematic-reveal";
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number; // 0 to 1
  amount?: string; // custom margin if needed
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // We observe both entrance and exit
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else {
          // Reset when leaving viewport (unless it's barely off-screen, handled by threshold)
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "-40px 0px -40px 0px", // triggers gracefully before fully offscreen
      }
    );

    observer.observe(element);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  // Map animations to classes for modular GPU styling
  const getAnimationStyles = () => {
    const delayStyle = delay ? `${delay}ms` : "0ms";
    const durationStyle = `${duration}ms`;

    const baseStyles = {
      transitionDelay: delayStyle,
      transitionDuration: durationStyle,
    };

    let transformClasses = "";
    switch (animation) {
      case "fade-up":
        transformClasses = isRevealed 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10";
        break;
      case "fade-down":
        transformClasses = isRevealed 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 -translate-y-10";
        break;
      case "fade-left":
        transformClasses = isRevealed 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-10";
        break;
      case "fade-right":
        transformClasses = isRevealed 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-10";
        break;
      case "blur-clear":
        transformClasses = isRevealed 
          ? "opacity-100 scale-100 blur-0" 
          : "opacity-0 scale-[0.97] blur-md";
        break;
      case "scale-up":
        transformClasses = isRevealed 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-[0.93]";
        break;
      case "glow-reveal":
        transformClasses = isRevealed 
          ? "opacity-100 shadow-[0_0_30px_var(--theme-glow)] border-[var(--theme-color)]" 
          : "opacity-40 border-white/5 shadow-none";
        break;
      case "depth-reveal":
        transformClasses = isRevealed 
          ? "opacity-100 scale-100 rotate-0" 
          : "opacity-0 scale-90 rotate-x-12";
        break;
      case "cinematic-reveal":
        transformClasses = isRevealed 
          ? "opacity-100 translate-y-0 blur-0" 
          : "opacity-0 translate-y-[15px] blur-[6px]";
        break;
      default:
        transformClasses = isRevealed ? "opacity-100" : "opacity-0";
    }

    return {
      className: `transition-all cubic-bezier(0.16, 1, 0.3, 1) ease-out transform-gpu ${transformClasses}`,
      style: baseStyles,
    };
  };

  const anim = getAnimationStyles();

  return (
    <div
      ref={ref}
      className={`${anim.className} ${className}`}
      style={anim.style}
    >
      {children}
    </div>
  );
}
