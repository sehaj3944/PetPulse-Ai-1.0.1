import React from "react";
import { conceptCards } from "../data";
import { motion } from "motion/react";

export default function ProductConcept() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 35, opacity: 0, filter: "blur(2px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="product" className="relative py-32 px-6">
      {/* Decorative center backdrop gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[100px] rounded-full pointer-events-none transition-all duration-1000 opacity-[0.05]" 
        style={{ backgroundImage: "linear-gradient(to right, #4D9FFF, var(--theme-color))" }}
      />

      <div className="max-w-7xl mx-auto position-relative z-10">
        <motion.div 
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            className="text-sm font-bold tracking-widest uppercase transition-colors duration-1000"
            style={{ color: "var(--theme-color)" }}
          >
            The Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Beyond Location Tracking.
            <br />
            <span 
              className="text-transparent bg-clip-text transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
            >
              Into Deep Emotional Resonance.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            PetPulse AI™ represents a fundamental paradigm shift in pet technology—moving away from trivial distance tracking into highly accurate bio-emotional translation.
          </p>
        </motion.div>

        {/* Concept Cards Grid with Staggered Scroll-Triggers */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "-80px" }}
        >
          {conceptCards.map((concept, index) => {
            const IconComponent = concept.icon;
            return (
              <motion.div 
                key={index} 
                className="group bg-white/5 border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.015,
                  borderColor: "var(--theme-color)",
                  boxShadow: "0 10px 30px -10px var(--theme-glow)"
                }}
              >
                <div>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-1000 group-hover:shadow-[0_0_30px_var(--theme-glow-subtle)]"
                    style={{ backgroundColor: "var(--theme-glow)" }}
                  >
                    <IconComponent className="w-7 h-7 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight transition-colors duration-300 group-hover:text-[var(--theme-color)] font-space-grotesk">
                    {concept.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {concept.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Big visual Core Benefits row with slide fade */}
        <motion.div 
          className="mt-16 bg-gradient-to-br from-white/5 to-[#1A1A2F]/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#4D9FFF] opacity-10 blur-3xl rounded-full" />
          
          <h3 className="text-2xl font-bold text-white mb-8 tracking-tight font-space-grotesk">
            Three Core Dimensions of PetPulse Care
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
              <div 
                className="text-lg font-bold mb-2 transition-colors duration-1000"
                style={{ color: "var(--theme-color)" }}
              >
                Deeper Empathetic Connection
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Empower your household with objective information on what your pet feels, reducing speculation and avoiding costly behavioral guesswork.
              </p>
            </div>
            
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
              <div className="text-lg font-bold text-[#4D9FFF] mb-2">Proactive Vitals &amp; Prevention</div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Acknowledge physiological fatigue, isolation markers, or distress loops before they trigger pathological stress reactions or illnesses.
              </p>
            </div>
            
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
              <div className="text-lg font-bold text-[#AB47BC] mb-2">Omnipresent Peace of Mind</div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Stay updated on daily routines and anxiety spikes through contextual automated reports, ensuring they are happy even during work hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
