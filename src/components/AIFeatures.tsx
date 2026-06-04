import React from "react";
import { aiFeatures } from "../data";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function AIFeatures() {
  const stats = [
    { value: "40+", label: "Emotional States Decoded" },
    { value: "94%", label: "Need Prediction Accuracy" },
    { value: "1M+", label: "Vitals Data Points/Day" },
    { value: "<200ms", label: "Intel Response Time" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-1/3 w-80 h-80 bg-[#AB47BC]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
            <span className="text-xs text-gray-300 font-semibold tracking-wider uppercase">Artificial Empathy System</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Intelligence That
            <br />
            <span 
              className="text-transparent bg-clip-text transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF, #AB47BC)" }}
            >
              Understands Emotion
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Our multi-tier neural models process continuous biological feeds on-device and in the cloud—converting biometric data streams into rich, actionable emotional clarity.
          </p>
        </motion.div>

        {/* Features Cards Grid with Staggered Scroll-Triggers */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
        >
          {aiFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white/5 border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  borderColor: "var(--theme-color)",
                  boxShadow: "0 10px 30px -10px var(--theme-glow)"
                }}
              >
                <div>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-1000"
                    style={{
                      backgroundImage: "linear-gradient(135deg, var(--theme-glow), rgba(77, 159, 255, 0.2))"
                    }}
                  >
                    <IconComponent 
                      className="w-7 h-7 transition-all duration-1000 group-hover:scale-105" 
                      style={{ color: "var(--theme-color)" }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-space-grotesk group-hover:text-[var(--theme-color)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Big numeric stats row */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:border-white/20 transition-all cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div 
                className="text-4xl font-bold text-transparent bg-clip-text mb-2 font-space-grotesk transition-all duration-1000"
                style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
