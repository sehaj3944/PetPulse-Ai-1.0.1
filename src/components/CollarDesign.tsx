import React, { useState } from "react";
import { collarSpecs } from "../data";
import { Info, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TiltHover from "./TiltHover";

interface CollarDesignProps {
  collarImageUrl: string;
}

export default function CollarDesign({ collarImageUrl }: CollarDesignProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots = [
    {
      id: "sensor",
      x: "35%",
      y: "45%",
      title: "Biometric Nodes",
      desc: "Continuous heart rate variability (HRV) & thermal sensors mapping direct parasympathetic nervous activity."
    },
    {
      id: "ring",
      x: "65%",
      y: "35%",
      title: "Active LED Ring",
      desc: "Custom RGB LED array capable of high-intensity states, providing real-time ambient mood feedback."
    },
    {
      id: "clasp",
      x: "50%",
      y: "75%",
      title: "Aerospace Aluminum Clasp",
      desc: "Machined brushed aluminum interlocking clasp designed for heavy activity and security."
    }
  ];

  return (
    <section id="specs" className="relative py-32 px-6 bg-black/40 overflow-hidden">
      {/* Dynamic background lighting that slightly pulses */}
      <motion.div 
        className="absolute top-20 right-10 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ backgroundColor: "var(--theme-color)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Cinematic zoom-out and fade on scroll reveal */}
          <motion.div 
            className="order-1 md:order-1 relative flex flex-col items-center w-full max-w-lg md:max-w-none mx-auto"
            initial={{ scale: 1.05, opacity: 0, y: 15 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-120px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center mb-4 text-xs text-gray-500 font-mono tracking-widest uppercase">
              Interact • Hover over hotspots
            </div>
            
            <TiltHover className="w-full max-w-md">
              <div className="relative w-full bg-[#0E0E15]/90 p-4 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                {/* Outer Glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full filter blur-[60px] pointer-events-none transition-all duration-1000" 
                  style={{ backgroundColor: "var(--theme-glow)" }}
                />

                <img 
                  src={collarImageUrl} 
                  alt="Collar Detail Schematic" 
                  className="relative z-10 w-full h-auto rounded-2xl border border-white/5 shadow-2xl transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Hotspot dots */}
                {hotspots.map((spot) => (
                  <div 
                    key={spot.id}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    <button className="relative w-6 h-6 flex items-center justify-center cursor-pointer">
                      <span 
                        className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping transition-colors duration-1000"
                        style={{ backgroundColor: "var(--theme-color)" }}
                      />
                      <span 
                        className="relative inline-flex rounded-full h-3.5 w-3.5 transition-all duration-1000"
                        style={{ 
                          backgroundColor: "var(--theme-color)",
                          boxShadow: "0 0 10px var(--theme-glow-subtle)" 
                        }}
                      />
                    </button>

                    {/* Hotspot Hover popover */}
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-3 bg-black/95 border rounded-xl shadow-2xl z-30 pointer-events-none backdrop-blur-md"
                          style={{ borderColor: "var(--theme-color-subtle)" }}
                        >
                          <div className="text-xs font-bold mb-1 transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>{spot.title}</div>
                          <p className="text-[10px] text-gray-300 leading-normal">{spot.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </TiltHover>

            {/* Static labels as secondary showcase */}
            <div className="w-full max-w-md grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1 font-mono">Structure</div>
                <div className="text-sm font-semibold text-white font-space-grotesk">Water Resistant to 50m</div>
                <p className="text-xs text-gray-400 mt-1 leading-normal">Ready for beach trips, heavy rain, and dynamic swimming.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1 font-mono">Feedback</div>
                <div 
                  className="text-sm font-semibold font-space-grotesk font-mono transition-colors duration-1000"
                  style={{ color: "var(--theme-color)" }}
                >
                  Dynamic Light Pattern
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-normal">Automatically switches to glowing pulse ring with emotion.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Spec Checklist Slides in Opposite Direction */}
          <motion.div 
            className="order-2 md:order-2 text-center md:text-left flex flex-col justify-center"
            initial={{ x: 45, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="text-xs md:text-sm font-bold tracking-[0.2em] mb-3 uppercase transition-colors duration-1000"
              style={{ color: "var(--theme-color)" }}
            >
              Hardware Specs
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-6 leading-tight">
              Engineering Meets
              <br />
              <span 
                className="text-transparent bg-clip-text transition-all duration-1000"
                style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
              >
                Bespoke Tailoring
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
              The PetPulse AI smart collar is a masterpiece of micro-electronics and mechanical design, crafted to feel entirely unnoticeable on your pet while tracking high-fidelity biological metrics.
            </p>

            <div className="space-y-6 text-left max-w-xl mx-auto md:mx-0">
              {collarSpecs.map((spec, index) => {
                const IconComponent = spec.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div 
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--theme-color)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }}
                    >
                      <IconComponent className="w-6 h-6 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white mb-1 tracking-tight group-hover:text-[#4D9FFF] transition-colors font-space-grotesk">
                        {spec.label}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {spec.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div 
              className="mt-10 p-6 border rounded-xl text-left max-w-xl mx-auto md:mx-0 transition-all duration-1000"
              style={{ 
                backgroundImage: "linear-gradient(to right, var(--theme-glow), rgba(77, 159, 255, 0.05))",
                borderColor: "var(--theme-color-subtle)"
              }}
            >
              <div 
                className="text-xs font-bold tracking-wider uppercase mb-1 font-mono transition-colors duration-1000"
                style={{ color: "var(--theme-color)" }}
              >
                Environmental Durability
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                IP68 fully dust &amp; waterproof up to 50 meters. Heavy sports vibration-certified, medical-grade composite strap casing. Weights exactly 28 grams.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
