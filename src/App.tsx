import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkle, Sparkles, X, Play, ShieldAlert, Award } from "lucide-react";

// Importing modular components
import Navigation from "./components/Navigation";
import Hero, { MOODS } from "./components/Hero";
import ProductConcept from "./components/ProductConcept";
import CollarDesign from "./components/CollarDesign";
import AIFeatures from "./components/AIFeatures";
import AppEcosystem from "./components/AppEcosystem";
import AppScreens from "./components/AppScreens";
import Branding from "./components/Branding";
import AdCopywriting from "./components/AdCopywriting";
import Jingle from "./components/Jingle";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import PetPulseAssistant from "./components/PetPulseAssistant";

// Global Cinematic Enhancements
import ScrollProgress from "./components/ScrollProgress";
import MouseGlow from "./components/MouseGlow";
import AmbientParticles from "./components/AmbientParticles";

export default function App() {
  // Global states
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  
  // Waitlist pre-order state
  const [formData, setFormData] = useState({ email: "", petType: "Dog", petName: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Constants
  const collarImageUrl = "https://dtvoeevhaseb5.cloudfront.net/user-uploads/5c3630fa-b7b7-417e-b6a1-901612a20724.jpg";
  const lifestyleImageUrl = "https://dtvoeevhaseb5.cloudfront.net/user-uploads/6499d990-a381-45a0-ab9a-31b7116658a8.jpg";

  // Sychronize selected mood's emotional signature colors dynamically to the DOM
  useEffect(() => {
    const currentMood = MOODS[activeMoodIndex];
    if (!currentMood) return;
    
    const root = document.documentElement;
    root.style.setProperty("--theme-color", currentMood.color);
    
    // Parse hex into r, g, b components to define clean alpha transparency variables
    let r = 0, g = 0, b = 0;
    if (currentMood.color.startsWith("#")) {
      const hex = currentMood.color.substring(1);
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    root.style.setProperty("--theme-glow", `rgba(${r}, ${g}, ${b}, 0.20)`);
    root.style.setProperty("--theme-glow-vibrant", `rgba(${r}, ${g}, ${b}, 0.40)`);
    root.style.setProperty("--theme-glow-subtle", `rgba(${r}, ${g}, ${b}, 0.08)`);

    // Calculate relative luminance to dynamically set the high-contrast text color
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const l = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
    const textColor = l > 0.5 ? "#000000" : "#ffffff";
    root.style.setProperty("--theme-text-color", textColor);
  }, [activeMoodIndex]);

  // Trigger Waitlist Pre-order Submission
  const handlePreorderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitted(true);
  };

  const closeReserveModal = () => {
    setFormData({ email: "", petType: "Dog", petName: "" });
    setIsSubmitted(false);
    setIsReserveModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans overflow-x-hidden selection:bg-theme-accent/30 selection:text-white relative">
      {/* Cinematic Global Scroll and Mouse Enhancements */}
      <ScrollProgress />
      <MouseGlow />
      <AmbientParticles count={40} />

      {/* Subtle large ambient emotional glow for the entire website */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1300px] rounded-full blur-[200px] opacity-[0.09] md:opacity-[0.12] transition-all duration-1000"
          style={{ backgroundColor: "var(--theme-color)" }}
        />
      </div>

      {/* Central Notification Ribbon */}
      <div className="bg-gradient-to-r from-theme-accent/20 via-[#4D9FFF]/25 to-[#AB47BC]/20 border-b border-theme-accent/20 py-2.5 px-4 text-center text-xs md:text-sm relative z-50 transition-colors duration-1000">
        <div className="flex items-center justify-center gap-2">
          <span className="bg-theme-accent/20 px-2 py-0.5 text-theme-accent font-bold rounded text-[10px] uppercase font-space-grotesk transition-colors duration-1000">WAITLIST ONLY</span>
          <span className="text-gray-300">Phase 1 Early slots are 92% registered. Pre-order now to secure Spring 2026 delivery.</span>
        </div>
      </div>

      {/* Shared Navigation Header */}
      <Navigation onReserveClick={() => setIsReserveModalOpen(true)} />

      {/* Main Landing Sections */}
      <main className="relative z-10">
        <Hero 
          collarImageUrl={collarImageUrl}
          onReserveClick={() => setIsReserveModalOpen(true)} 
          onWatchDemo={() => setIsDemoModalOpen(true)}
          activeMoodIndex={activeMoodIndex}
          setActiveMoodIndex={setActiveMoodIndex}
        />
        
        <ProductConcept />
        
        <CollarDesign collarImageUrl={collarImageUrl} />
        
        <AIFeatures />
        
        <AppEcosystem lifestyleImageUrl={lifestyleImageUrl} />
        
        <AppScreens />
        
        <Branding />
        
        <AdCopywriting />
        
        <Jingle />
        
        <Testimonials />
        
        <CTABanner onReserveClick={() => setIsReserveModalOpen(true)} />
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Floating AI Pet Telemetry Companion Assistant */}
      <PetPulseAssistant />

      {/* Central Global Reservation Modal Overlay */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0E0E15] border border-white/10 p-8 rounded-3xl max-w-md w-full relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 blur-xl pointer-events-none transition-all duration-1000" 
                style={{ backgroundImage: "linear-gradient(to bottom right, var(--theme-color-subtle), rgba(171, 71, 188, 0.1))" }}
              />
              
              <button 
                onClick={closeReserveModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <form onSubmit={handlePreorderSubmit} className="space-y-6">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold font-space-grotesk text-white">Pre-Order Reservation</h3>
                    <p className="text-xs text-gray-400 leading-normal">
                      No deposit required right now. Reserve your slot today. We will email you to select collar color and dimensions before shipment.
                    </p>
                  </div>

                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-space-grotesk">Email parent address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)]/20 transition-all font-sans"
                        placeholder="parent@petpulse.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-space-grotesk">Pet type</label>
                        <select 
                          value={formData.petType}
                          onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)]/20 transition-all font-sans"
                        >
                          <option value="Dog" className="text-black bg-white">Dog / Puppy</option>
                          <option value="Cat" className="text-black bg-white">Cat / Kitten</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-space-grotesk">Pet's name</label>
                        <input 
                          type="text" 
                          value={formData.petName}
                          onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)]/20 transition-all font-sans"
                          placeholder="Luna"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-12 rounded-full font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer hover:opacity-90 active:scale-[0.99] border"
                    style={{
                      backgroundColor: "var(--theme-color)",
                      color: "var(--theme-text-color)",
                      borderColor: "var(--theme-color)",
                      boxShadow: "0 4px 20px var(--theme-glow-subtle)"
                    }}
                  >
                    Lock In Pre-order Slot
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg transition-all duration-1000"
                    style={{
                      backgroundImage: "linear-gradient(to bottom right, var(--theme-color), #4D9FFF)",
                      boxShadow: "0 4px 15px var(--theme-glow)"
                    }}
                  >
                    <Sparkle className="w-8 h-8 text-black animate-spin" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-space-grotesk">Reservation Confirmed!</h3>
                    <p className="text-xs text-gray-400 leading-relaxed px-2">
                      Successfully secured preorder slot <span className="font-mono transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>#PP-PRE-5928</span>. We have emailed confirmation guidelines of your {formData.petType}'s pre-assessment to <span className="font-semibold text-white">{formData.email}</span>.
                    </p>
                  </div>

                  <button 
                    onClick={closeReserveModal}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-xs text-white rounded-full border border-white/10 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Central Global watch demo simulator overlay */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0E0E15] border border-white/10 p-6 rounded-3xl max-w-2xl w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center z-50 transition-all cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-4 text-center">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-space-grotesk">PetPulse AI Presentation</h3>
                  <p className="text-xs text-gray-400">Previewing: Hardware telemetry simulation &amp; emotional chimes demonstration reel</p>
                </div>

                {/* Simulated Screen with active running metrics overlay (looks extremely premium) */}
                <div className="relative aspect-video rounded-2xl bg-black border border-white/15 overflow-hidden flex flex-col justify-between p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-neutral-900 to-black">
                  
                  {/* Decorative Neural Network Waveform */}
                  <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none flex items-center justify-center">
                    <div 
                      className="w-64 h-64 border rounded-full animate-ping duration-1000 transition-all duration-1000" 
                      style={{ borderColor: "var(--theme-color-subtle)" }}
                    />
                    <div className="w-48 h-48 border border-[#4D9FFF]/20 rounded-full animate-ping duration-2000" />
                    <div className="w-32 h-32 border border-[#AB47BC]/20 rounded-full animate-ping duration-3000" />
                  </div>

                  {/* Header HUD overlay */}
                  <div className="relative z-10 flex justify-between text-[9px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> FEED: ONLINE</span>
                    <span>HD 1080p • PREVIEW MODE</span>
                  </div>

                  {/* Central Text description mimicking advertisement cues */}
                  <div className="relative z-10 text-center space-y-2">
                    <Play 
                      className="w-12 h-12 mx-auto opacity-75 animate-pulse transition-all duration-1000" 
                      style={{ 
                        color: "var(--theme-color)",
                        filter: "drop-shadow(0 0 15px var(--theme-glow))"
                      }}
                    />
                    <h4 className="text-lg font-bold text-white tracking-tight">"They can't speak, but now, they don't have to."</h4>
                    <p className="text-[10px] text-gray-400 max-w-md mx-auto leading-relaxed">Continuous heart rate, vocal pitch, and physical activity combined in on-collar neural chimes to forecast anxiety, stress, or delight loops.</p>
                  </div>

                  {/* Footer HUD telemetry variables */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 text-left bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 text-[9px] text-gray-500 font-mono">
                    <div>
                      <span className="text-gray-400 block font-bold">HR VARIABILITY</span>
                      <span className="font-bold transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>78 ms (Elevated)</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">VOCAL ANALYSIS</span>
                      <span className="text-[#4D9FFF] font-bold">Ultrasonic pitch 1.2kHz</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-bold">EST. MOOD STATE</span>
                      <span className="text-[#AB47BC] font-bold">Playful / Exploratory</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Award className="w-4 h-4 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                    <span>Certified safe for dogs &amp; cats by Vet Group CA.</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      setIsReserveModalOpen(true);
                    }}
                    className="px-6 py-2 text-xs font-bold rounded-full transition-all duration-500 cursor-pointer border hover:opacity-90 hover:scale-[1.02] active:scale-95"
                    style={{
                      backgroundColor: "var(--theme-color)",
                      color: "var(--theme-text-color)",
                      borderColor: "var(--theme-color)",
                      boxShadow: "0 4px 15px var(--theme-glow-subtle)"
                    }}
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
