import React, { useState } from "react";
import { Sparkles, PawPrint } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function Branding() {
  const [logoPulseRate, setLogoPulseRate] = useState(2); // seconds per pulse
  
  const taglines = [
    "Feel what they feel.",
    "Beyond tracking. Into understanding.",
    "The language of emotion, decoded.",
    "Where AI meets empathy.",
    "Your pet's feelings, finally understood."
  ];

  const brandPersonality = [
    {
      trait: "Empathetic",
      char: "E",
      description: "We represent raw affection, understanding emotional behaviors before statistical tracking."
    },
    {
      trait: "Intelligent",
      char: "I",
      description: "Sophisticated multi-layered biometric machine models that translate data seamlessly."
    },
    {
      trait: "Premium",
      char: "P",
      description: "Aerospace-grade materials and meticulously designed aesthetics styled for modern homes."
    },
    {
      trait: "Trustworthy",
      char: "T",
      description: "Clinically useful heart rate metrics and preventative warnings certified by veterinarians."
    }
  ];

  // Shimmer keyframes & pulse styles
  const shimmerAnimation = `
    @keyframes neonShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  return (
    <section className="relative py-32 px-6">
      <style>{shimmerAnimation}</style>
      <div className="max-w-7xl mx-auto relative z-10">
        
        <ScrollReveal 
          animation="cinematic-reveal"
          duration={900}
          className="text-center mb-20 space-y-4"
        >
          <div 
            className="text-sm font-bold tracking-widest uppercase transition-colors duration-1000"
            style={{ color: "var(--theme-color)" }}
          >
            Brand Assets
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Brand Identity
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Unveiling the visual guidelines, core slogans, and psychological personality dimensions that characterize the PetPulse AI™ brand.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Logo Showcase with customizable pulsing rate */}
          <motion.div 
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-350 cursor-pointer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "var(--theme-color)",
              boxShadow: "0 15px 40px -15px var(--theme-glow), 0 0 15px var(--theme-glow-subtle)"
            }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">Visual Logo Construct</h3>
              <p className="text-xs text-gray-400 mb-6 font-mono">Interactive: Adjust the brand paw pulse rate</p>
            </div>

            <div className="flex flex-col items-center justify-center py-10 relative">
              {/* Outer pulsing rings with custom shimmer styling */}
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden group shadow-2xl"
                  style={{ 
                    backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF, var(--theme-color))",
                    backgroundSize: "200% auto",
                    boxShadow: "0 0 60px var(--theme-glow)",
                    animation: "neonShimmer 5s linear infinite" 
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: logoPulseRate,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <PawPrint className="w-14 h-14 text-black relative z-10" fill="black" />
                </motion.div>
                
                {/* Secondary ring mimicking radar pulse */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 opacity-30"
                  style={{ borderColor: "var(--theme-color)" }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.15, 0.3]
                  }}
                  transition={{
                    duration: logoPulseRate * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -inset-4 rounded-full border-2 opacity-20"
                  style={{ borderColor: "var(--theme-color)" }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.05, 0.2]
                  }}
                  transition={{
                    duration: logoPulseRate * 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Slider Controller */}
              <div className="mt-12 w-full max-w-xs space-y-1 bg-black/40 p-3 rounded-lg border border-white/5">
                <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase font-space-grotesk">
                  <span>Pulse Frequency</span>
                  <span className="transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>{logoPulseRate}s cycles</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4" 
                  step="0.1" 
                  value={logoPulseRate} 
                  onChange={(e) => setLogoPulseRate(Number(e.target.value))}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: "var(--theme-color)" }}
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-xs font-bold text-gray-400 mb-1">Symbol Synthesis</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  A perfect geometric paw print encased in continuous radio-thermal wave arcs—denoting infinite love combined with real-time biometric observation.
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 mb-1">Typography Standard</div>
                <div className="text-2xl font-space-grotesk font-bold text-white tracking-tight">PetPulse AI™</div>
                <p className="text-[10px] text-gray-500 mt-1 font-mono">Set in Space Grotesk Bold. Emphasizes modern, technically sound engineering values.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Slogans & Taglines */}
          <motion.div 
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-350 cursor-pointer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -6,
              scale: 1.01,
              borderColor: "var(--theme-color)",
              boxShadow: "0 15px 40px -15px var(--theme-glow), 0 0 15px var(--theme-glow-subtle)"
            }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">Approved Slogans</h3>
              <p className="text-xs text-gray-400 mb-6 font-mono">Core copywriting variations representing emotional resonance</p>
            </div>

            <div className="space-y-4">
              {taglines.map((tagline, index) => (
                <motion.div 
                  key={index}
                  className="p-4 bg-gradient-to-r from-white/5 to-white/0 border rounded-xl transition-all group cursor-pointer"
                  style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  whileHover={{ 
                    scale: 1.015,
                    borderColor: "var(--theme-color)",
                    backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))"
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles 
                      className="w-4 h-4 group-hover:rotate-45 transition-transform flex-shrink-0 duration-1000" 
                      style={{ color: "var(--theme-color)" }}
                    />
                    <span className="text-sm font-medium text-gray-300 italic group-hover:text-white transition-colors">
                      "{tagline}"
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8 p-5 rounded-xl border bg-[#1A1A2F]/20 relative overflow-hidden"
              style={{ borderColor: "var(--theme-color)" }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Shimmer light bar across banner */}
              <div className="absolute top-0 -inset-x-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-none" />
              <div 
                className="text-xs font-bold mb-1 uppercase tracking-wider transition-colors duration-1000"
                style={{ color: "var(--theme-color)" }}
              >
                Primary Trademark Tagline
              </div>
              <div className="text-xl font-space-grotesk font-bold text-white italic">"Feel what they feel."</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Global Brand Personality Row with staggered character triggers */}
        <motion.div 
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 font-space-grotesk text-center">Brand Personality Pillars</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {brandPersonality.map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center space-y-3 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div 
                  className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center border transition-all duration-300"
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--theme-color)";
                    e.currentTarget.style.boxShadow = "0 0 15px var(--theme-glow-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="text-2xl font-black transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>{item.char}</span>
                </div>
                <div className="text-lg font-bold text-white tracking-tight">{item.trait}</div>
                <p className="text-xs text-gray-400 leading-relaxed px-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
