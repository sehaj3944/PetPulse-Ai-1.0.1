import React from "react";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "./MagneticButton";
import TiltHover from "./TiltHover";
import TextReveal from "./TextReveal";

interface HeroProps {
  collarImageUrl: string;
  onReserveClick: () => void;
  onWatchDemo: () => void;
  activeMoodIndex: number;
  setActiveMoodIndex: (idx: number) => void;
}

export const MOODS = [
  { 
    name: "Calm / Peaceful", 
    color: "#00E5FF", 
    glow: "shadow-[0_0_30px_rgba(0,229,255,0.7)]", 
    bg: "rgba(0,229,255,0.15)",
    description: "Luna is resting and feels completely safe. Heart rate is stable at 68 bpm. High HRV.",
    iconColor: "text-[#00E5FF]", 
    accent: "border-[#00E5FF]" 
  },
  { 
    name: "Anxious / Stressed", 
    color: "#FFA726", 
    glow: "shadow-[0_0_30px_rgba(255,167,38,0.7)]", 
    bg: "rgba(255,167,38,0.15)",
    description: "Slight heart rate spike detected (92 bpm). Vocal pitch analysis indicates minor displacement whiskers/isolation stress.",
    iconColor: "text-[#FFA726]", 
    accent: "border-[#FFA726]" 
  },
  { 
    name: "Playful / Joyful", 
    color: "#66BB6A", 
    glow: "shadow-[0_0_30px_rgba(102,187,106,0.7)]", 
    bg: "rgba(102,187,106,0.15)",
    description: "Luna is in a state of high delight! Playful activity triggers recorded. Oxytocin index estimated high.",
    iconColor: "text-[#66BB6A]", 
    accent: "border-[#66BB6A]" 
  },
  { 
    name: "Curious / Exploratory", 
    color: "#AB47BC", 
    glow: "shadow-[0_0_30px_rgba(171,71,188,0.7)]", 
    bg: "rgba(171,71,188,0.15)",
    description: "Highly focused exploratory movement. Heart rate is 82 bpm with active alert observation markers.",
    iconColor: "text-[#AB47BC]", 
    accent: "border-[#AB47BC]" 
  }
];

export default function Hero({ collarImageUrl, onReserveClick, onWatchDemo, activeMoodIndex, setActiveMoodIndex }: HeroProps) {
  const currentMood = MOODS[activeMoodIndex] || MOODS[0];

  // Apple-style curve easeOutExpo: [0.16, 1, 0.3, 1]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0, filter: "blur(3px)" },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Dynamic Background Glows based on Active Mood */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none border-b border-white/5">
        <motion.div 
          className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.08] md:opacity-[0.11]"
          style={{ backgroundColor: "var(--theme-color)" }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.05] md:opacity-[0.07]"
          style={{ backgroundColor: "var(--theme-color)" }}
          animate={{
            scale: [1.2, 1.05, 1.2],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column Description */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-1000"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 text-theme-accent animate-pulse" />
            <span className="text-xs md:text-sm text-gray-300">Powered by Proprietary Emotion AI Models</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <TextReveal 
              text="The Inner Life"
              className="text-5xl md:text-7xl font-space-grotesk font-bold text-white leading-tight tracking-tight block"
              as="h1"
            />
            <span 
              className="text-5xl md:text-7xl font-space-grotesk font-bold text-transparent bg-clip-text transition-all duration-1000 tracking-tight block"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
            >
              of Your Pet
            </span>
          </motion.div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl animate-pulse duration-1000"
            variants={itemVariants}
          >
            PetPulse AI™ goes beyond basic location tracking. We continuously map heart rates, thermal baselines, and vocal tones to decode your pet's exact biological feelings—creating an unbreakable connection through empathic technology.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-6 items-start" variants={itemVariants}>
            <MagneticButton>
              <button 
                onClick={onReserveClick}
                className="px-8 py-4 text-base font-bold rounded-full transition-all duration-500 flex items-center justify-center gap-2 group cursor-pointer hover:brightness-110"
                style={{
                  backgroundColor: "var(--theme-color)",
                  color: "var(--theme-text-color)",
                  boxShadow: "0 10px 30px -10px var(--theme-glow), 0 0 20px var(--theme-glow-subtle)"
                }}
              >
                <span>Reserve Your Collar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <button 
                onClick={onWatchDemo}
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white text-base font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 text-gray-400" />
                <span>Watch Demo Video</span>
              </button>
            </MagneticButton>
          </motion.div>

          {/* Core Telemetry Numbers Staggered entrance */}
          <motion.div className="flex items-center gap-6 md:gap-8 pt-4" variants={itemVariants}>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-space-grotesk">98%</div>
              <div className="text-[11px] md:text-xs text-gray-500 font-medium">Emotion Accuracy</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-space-grotesk">24/7</div>
              <div className="text-[11px] md:text-xs text-gray-500 font-medium font-space-grotesk">Vitals Analytics</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white font-space-grotesk">50K+</div>
              <div className="text-[11px] md:text-xs text-gray-500 font-medium">Early Reservists</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column Interactive Collar Showcase with a smooth levitating motion */}
        <motion.div 
          className="relative flex flex-col items-center w-full"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Main collar image wrapper - Floating + Tilt Effect */}
          <TiltHover className="w-full max-w-md">
            <motion.div 
              className="relative w-full bg-[#0E0E15]/90 p-6 rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden group shadow-[0_0_80px_var(--theme-glow-subtle)]"
              animate={{
                y: [0, -12, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Soft, atmospheric multi-layered dynamic emotional halo glows */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full filter blur-[75px] opacity-[0.38] transition-all duration-750 pointer-events-none"
                style={{ backgroundColor: "var(--theme-color)" }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full filter blur-[110px] opacity-[0.25] transition-all duration-1000 pointer-events-none"
                style={{ backgroundColor: "var(--theme-color)" }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full filter blur-[150px] opacity-[0.15] transition-all duration-1000 pointer-events-none"
                style={{ backgroundColor: "var(--theme-color)" }}
              />

              {/* Simulated Collar Light Ring */}
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl transition-colors duration-1000" />

              <img 
                src={collarImageUrl} 
                alt="PetPulse AI Smart Collar" 
                className="relative z-10 w-full h-auto rounded-2xl mx-auto shadow-lg object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />

              {/* Mood selector inside card */}
              <div className="relative z-20 mt-6 pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>SIMULATOR: CHOOSE EMOTION</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white animate-pulse">Active</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {MOODS.map((mood, idx) => (
                    <button
                      key={mood.name}
                      onClick={() => setActiveMoodIndex(idx)}
                      style={{ backgroundColor: activeMoodIndex === idx ? mood.color : "transparent" }}
                      className={`h-9 rounded-xl border text-[11px] font-semibold transition-all duration-300 ${
                        activeMoodIndex === idx 
                          ? "text-black border-transparent font-bold scale-105 shadow-md shadow-black/20" 
                          : "text-gray-300 bg-black/40 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {mood.name.split(" ")[0]}
                    </button>
                  ))}
                </div>

                {/* Dynamic State Description */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMoodIndex}
                    initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1.5 min-h-[72px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-color)" }} />
                      <span className="text-xs font-bold transition-all duration-1000" style={{ color: "var(--theme-color)" }}>{currentMood.name} Mode</span>
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed">
                      {currentMood.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </TiltHover>
        </motion.div>
      </div>
    </section>
  );
}
