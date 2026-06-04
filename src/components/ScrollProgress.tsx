import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once at start
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none origin-left overflow-visible">
      <div 
        className="h-full transition-all duration-75 ease-out select-none relative"
        style={{ 
          width: `${scrollProgress}%`,
          backgroundColor: "var(--theme-color)",
          boxShadow: "0 1px 10px var(--theme-color), 0 2px 20px var(--theme-color)"
        }}
      />
    </div>
  );
}
