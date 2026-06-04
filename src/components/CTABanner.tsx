import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CTABannerProps {
  onReserveClick: () => void;
}

export default function CTABanner({ onReserveClick }: CTABannerProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", petType: "Dog", petName: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setFormData({ email: "", petType: "Dog", petName: "" });
    setIsSubmitted(false);
    setShowModal(false);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Dynamic atmospheric decorations with soft 8-12% opacity */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 opacity-[0.06] transition-all duration-1000" 
          style={{ backgroundColor: "var(--theme-color)" }}
          animate={{
            opacity: [0.06, 0.09, 0.06]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] opacity-[0.06] blur-[200px] rounded-full pointer-events-none transition-all duration-1000" 
          style={{ backgroundColor: "var(--theme-color)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Dramatic Fade Up Card inside CTA Banner with glow intensity shifts on interaction */}
        <motion.div 
          className="bg-[#0E0E15]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_80px_var(--theme-glow-subtle)]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            boxShadow: "0 0 100px var(--theme-glow)",
            borderColor: "var(--theme-color-subtle)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
            <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider font-mono">Early Reservists Phase</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold text-white mb-6 leading-tight">
            Reserve Your
            <br />
            <span 
              className="text-transparent bg-clip-text transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
            >
              PetPulse AI Smart Collar
            </span>
          </h2>

          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Join 50,000+ modern pet parents who are upgrading their connection. Secure your premium emotion-monitoring hardware and full mobile access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button 
              onClick={() => setShowModal(true)}
              className="px-10 py-5 text-base font-bold rounded-full transition-all duration-500 flex items-center justify-center gap-3 transform hover:scale-[1.03] active:scale-95 cursor-pointer"
              style={{
                backgroundColor: "var(--theme-color)",
                color: "var(--theme-text-color)",
                boxShadow: "0 10px 35px -5px var(--theme-glow)"
              }}
            >
              <span>Reserve Now • $159</span>
              <ArrowRight className="w-5 h-5 animate-pulse" style={{ color: "var(--theme-text-color)" }} />
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="px-10 py-5 bg-white/5 border border-white/15 hover:bg-white/10 text-white text-base font-bold rounded-full transition-all active:scale-95 cursor-pointer"
            >
              Join Free Waitlist
            </button>
          </div>

          {/* Guarantees row with icons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
              <span>Ships Spring 2026</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4D9FFF]" />
              <span>30-Day Happiness Guarantee</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#AB47BC]" />
              <span>Lifetime AI Core Update</span>
            </div>
          </div>

          {/* What's included block */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4 font-mono">WHAT'S INCLUDED IN THE BOX</div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                "PetPulse AI Collar",
                "Induction Wireless Charging Dock",
                "Advanced Mobile Companion (Life access)",
                "On-Device Bluetooth LE Beacon",
                "Veterinary Advisor Call slot"
              ].map((item, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-300 hover:border-white/10 transition-all font-medium cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* RETAIN Pre-Order overlay modal form */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0E0E15] border border-white/15 p-8 rounded-3xl max-w-md w-full relative overflow-hidden shadow-[0_0_80px_var(--theme-glow-subtle)]"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 blur-xl pointer-events-none transition-all duration-1000 opacity-20" 
                style={{ backgroundColor: "var(--theme-color)" }}
              />
              
              <button 
                onClick={resetModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-space-grotesk text-white">Pre-Order Reservation</h3>
                    <p className="text-xs text-gray-400 leading-normal">
                      Secure your smart collar today. No payment is required right now—we will contact you to collect sizing preferences.
                    </p>
                  </div>

                  <div className="space-y-3.5 text-left">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-mono">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none transition-all duration-300"
                        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--theme-color)"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder="parent@petpulse.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-mono">Pet Category</label>
                        <select 
                          value={formData.petType}
                          onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-xs text-white focus:outline-none transition-all duration-300"
                          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                          <option value="Dog" className="text-black bg-white">Puppy / Dog</option>
                          <option value="Cat" className="text-black bg-white">Kitten / Cat</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 font-mono">Pet's Name</label>
                        <input 
                          type="text" 
                          value={formData.petName}
                          onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none transition-all duration-300"
                          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                          onFocus={(e) => e.target.style.borderColor = "var(--theme-color)"}
                          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                          placeholder="Luna"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-12 rounded-full font-bold text-sm tracking-wide transition-all duration-500 cursor-pointer hover:brightness-110"
                    style={{
                      backgroundColor: "var(--theme-color)",
                      color: "var(--theme-text-color)",
                      boxShadow: "0 6px 20px -5px var(--theme-glow)"
                    }}
                  >
                    Lock In Pre-order Slot
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg animate-pulse transition-all duration-1000"
                    style={{
                      backgroundColor: "var(--theme-color)",
                      boxShadow: "0 0 25px var(--theme-glow)"
                    }}
                  >
                    <Sparkle className="w-8 h-8" style={{ color: "var(--theme-text-color)" }} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white font-space-grotesk">Reservation Confirmed!</h3>
                    <p className="text-xs text-gray-400 leading-relaxed px-2">
                      Successfully secured preorder slot <span className="font-mono font-bold" style={{ color: "var(--theme-color)" }}>#PP-PRE-5928</span>. We have emailed confirmation guidelines of your {formData.petType}'s pre-assessment to <span className="font-semibold text-white">{formData.email}</span>.
                    </p>
                  </div>

                  <button 
                    onClick={resetModal}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-xs text-white rounded-full border border-white/10 cursor-pointer transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
