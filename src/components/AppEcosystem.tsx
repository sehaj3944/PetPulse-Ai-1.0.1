import React from "react";
import { appFeatures } from "../data";
import { Smartphone } from "lucide-react";
import { motion } from "motion/react";
import TiltHover from "./TiltHover";
import ScrollReveal from "./ScrollReveal";

interface AppEcosystemProps {
  lifestyleImageUrl: string;
}

export default function AppEcosystem({ lifestyleImageUrl }: AppEcosystemProps) {
  return (
    <section id="app" className="relative py-32 px-6 bg-black/40 overflow-hidden">
      {/* Smooth, atmospheric radial aura at low opacity */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[220px] opacity-[0.06] pointer-events-none" 
        style={{ backgroundColor: "var(--theme-color)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Zoom-Out Cinematic Reveal on Scroll */}
          <motion.div 
            className="order-1 md:order-1 relative group w-full max-w-lg md:max-w-none mx-auto"
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.15, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="absolute -inset-4 rounded-3xl blur-[100px] opacity-[0.15] pointer-events-none transition-all duration-1000" 
              style={{ backgroundColor: "var(--theme-color)" }}
            />
            
            <TiltHover className="w-full">
              <img 
                src={lifestyleImageUrl} 
                alt="PetPulse AI Mobile App Lifestyle representation" 
                className="w-full aspect-[4/3] md:aspect-square xl:aspect-[4/5] rounded-3xl transition-all duration-1000 object-cover transform"
                style={{ boxShadow: "0 0 60px var(--theme-glow-subtle)" }}
                referrerPolicy="no-referrer"
              />
            </TiltHover>

            {/* Float badge */}
            <motion.div 
              className="absolute top-6 left-6 bg-black/90 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl z-20 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">Active Sync</div>
              <div 
                className="text-sm font-semibold flex items-center gap-1.5 mt-0.5 transition-colors duration-1000"
                style={{ color: "var(--theme-color)" }}
              >
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-color)" }} />
                <span className="font-space-grotesk">On-Device Bluetooth LE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Descriptions & Subfeatures sliding in the opposite direction */}
          <motion.div 
            className="order-2 md:order-2 text-center md:text-left flex flex-col justify-center"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollReveal animation="cinematic-reveal" duration={900}>
              <div 
                className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 transition-colors duration-1000 font-space-grotesk"
                style={{ color: "var(--theme-color)", opacity: 0.85 }}
              >
                Mobile Companion
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight mb-5">
                An Entire Emotional Map
                <br />
                <span 
                  className="text-transparent bg-clip-text transition-all duration-1000"
                  style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
                >
                  Right In Your Pocket
                </span>
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 font-sans">
                The PetPulse companion mobile app streams raw telemetry data directly into custom graphical widgets. Track weekly distress indices, establish safe tracking zones, and receive real-time emotional recommendations.
              </p>
            </ScrollReveal>

            <div className="space-y-6 mb-10 text-left max-w-xl mx-auto md:mx-0">
              {appFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div 
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--theme-color)";
                        e.currentTarget.style.boxShadow = "0 0 15px var(--theme-glow)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <IconComponent className="w-5 h-5 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white mb-1 transition-colors duration-300 font-space-grotesk group-hover:text-white">
                        {feature.title}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center md:justify-start w-full">
              <button 
                className="px-8 py-4 text-sm md:text-base font-bold rounded-full transition-all duration-500 flex items-center gap-2.5 cursor-not-allowed opacity-[0.95] hover:brightness-110"
                style={{
                  backgroundColor: "var(--theme-color)",
                  color: "var(--theme-text-color)",
                  boxShadow: "0 10px 30px -10px var(--theme-glow), 0 0 15px var(--theme-glow-subtle)"
                }}
              >
                <Smartphone className="w-5 h-5" />
                <span>Download App (Coming Soon)</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
