import React, { useState } from "react";
import { adHeadlines, ctaLines } from "../data";
import { MessageSquare, Globe, Instagram, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdCopywriting() {
  const [selectedHeadline, setSelectedHeadline] = useState(adHeadlines[0]);
  const [selectedCTA, setSelectedCTA] = useState(ctaLines[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyAd = () => {
    const textToCopy = `Headline: ${selectedHeadline}\nCall To Action: ${selectedCTA}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText("Copied!");
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section className="relative py-32 px-6 bg-black/40">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] blur-[150px] rounded-full pointer-events-none transition-all duration-1000 opacity-[0.05]" 
        style={{ backgroundImage: "radial-gradient(circle, var(--theme-color), transparent)" }}
      />

      <div className="max-w-7xl mx-auto position-relative z-10">
        
        <div className="text-center mb-20 space-y-4">
          <div 
            className="text-sm font-bold tracking-widest uppercase transition-colors duration-1000"
            style={{ color: "var(--theme-color)" }}
          >
            Copywriting Sandbox
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Marketing Copywriting
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Emotional, highly targeted ad copies designed to hook potential reservists. Click different segments on the left to preview them inside the Instagram mockup on the right.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column Builder Choices */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Headlines Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2 transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white font-space-grotesk">Approved Headlines</h3>
              </div>
              <div className="space-y-2.5 max-h-[220px] overflow-y-hidden hover:overflow-y-auto scroll-smooth no-scrollbar pr-1">
                {adHeadlines.map((headline, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedHeadline(headline)}
                    className="p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all duration-300"
                    style={selectedHeadline === headline ? {
                      backgroundColor: "var(--theme-glow)",
                      borderColor: "var(--theme-color)",
                      color: "#ffffff",
                      fontWeight: "500"
                    } : {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.05)",
                      color: "#9ca3af"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedHeadline !== headline) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedHeadline !== headline) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    {headline}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2 transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>
                <Globe className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white font-space-grotesk">Call-to-Action Lines</h3>
              </div>
              <div className="space-y-2.5 max-h-[220px] overflow-y-hidden hover:overflow-y-auto scroll-smooth no-scrollbar pr-1">
                {ctaLines.map((cta, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCTA(cta)}
                    className="p-3 rounded-xl border text-xs md:text-sm cursor-pointer transition-all duration-300"
                    style={selectedCTA === cta ? {
                      backgroundColor: "var(--theme-glow)",
                      borderColor: "var(--theme-color)",
                      color: "#ffffff",
                      fontWeight: "500"
                    } : {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.05)",
                      color: "#9ca3af"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCTA !== cta) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCTA !== cta) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    {cta}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Live Instagram Ad Post Mockup */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-24 h-24 blur-xl rounded-full opacity-[0.12] transition-all duration-1000" 
              style={{ backgroundColor: "var(--theme-color)" }}
            />
            
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Instagram className="w-5 h-5 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                <span className="text-xs uppercase tracking-widest font-bold">Interactive Post Ad Mockup</span>
              </div>

              {/* Copy Ad Kit button */}
              <button 
                onClick={handleCopyAd}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg flex items-center gap-1.5 cursor-pointer border border-white/10"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Ad Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Instagram Post Box */}
            <div className="bg-[#0A0A0F] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex-1 flex flex-col justify-between">
              {/* Header */}
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full transition-all duration-1000" 
                    style={{ backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)" }}
                  />
                  <div>
                    <div className="text-[11px] font-bold text-white">petpulse_ai</div>
                    <div className="text-[8px] text-gray-500">Sponsored</div>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">•••</span>
              </div>

              {/* Interactive Render */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1A1A2F]/50 via-[#0A0A0F] to-[#2E2E3F]/30 p-6 flex flex-col justify-center text-center space-y-4">
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[8px] text-gray-400">
                  Concept Ad
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedHeadline}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg md:text-xl font-space-grotesk font-black text-white leading-tight px-4 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                  >
                    "{selectedHeadline}"
                  </motion.div>
                </AnimatePresence>

                <div 
                  className="text-[9px] uppercase font-bold tracking-widest transition-colors duration-1000"
                  style={{ color: "var(--theme-color)" }}
                >
                  PetPulse AI • Emotion-Aware Collar
                </div>
              </div>

              {/* Call out Bar */}
              <div className="p-3 bg-[#1A1A2F]/50 flex items-center justify-between border-t border-white/10">
                <span className="text-[10px] text-gray-300 font-bold">{selectedCTA}</span>
                <button 
                  className="px-3.5 py-1.5 text-[9px] font-bold rounded transition-all duration-500 hover:scale-105"
                  style={{
                    backgroundColor: "var(--theme-color)",
                    color: "var(--theme-text-color)",
                    boxShadow: "0 2px 8px var(--theme-glow)"
                  }}
                >
                  Learn More
                </button>
              </div>

              {/* Actions & Description */}
              <div className="p-3 pb-4 space-y-1.5 border-t border-white/5">
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>♥️ 4.3K</span>
                  <span>💬 280</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  <span className="font-bold text-white mr-1.5">petpulse_ai</span>
                  They cannot tell you when they are scared, anxious, or tired. That's why we engineered PetPulse AI. Code your pet's happiness today.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
