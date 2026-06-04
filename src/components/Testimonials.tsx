import React from "react";
import { testimonialsList } from "../data";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const reviewsCount = [
    { num: "50K+", label: "Happy Pet Families" },
    { num: "4.9/5", label: "App Store Core Rating" },
    { num: "98%", label: "Recommend PetPulse" },
    { num: "94%", label: "Prevention Advisory Alert" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative py-32 px-6">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] blur-[150px] rounded-full pointer-events-none transition-all duration-1000 opacity-[0.05]" 
        style={{ backgroundImage: "radial-gradient(circle, var(--theme-color), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="text-sm font-bold tracking-widest uppercase transition-colors duration-1000"
            style={{ color: "var(--theme-color)" }}
          >
            Social Proof
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Loved By Pet Families
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover how thousands of early adopter pet parents and veterinary specialists are finding deeper meaning and preemptive health warnings through PetPulse AI™.
          </p>
        </motion.div>

        {/* Quotes Grid with gentle stagger reveals and hover depth */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-80px" }}
        >
          {testimonialsList.map((test, index) => (
            <motion.div 
              key={index} 
              className="bg-white/5 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              variants={cardVariants}
              whileHover={{
                y: -6,
                borderColor: "var(--theme-color)",
                boxShadow: "0 15px 35px -10px var(--theme-glow)"
              }}
            >
              <div>
                {/* Glowing stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 transition-colors duration-1000" 
                      style={{ color: "var(--theme-color)", fill: "var(--theme-color)" }}
                    />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote 
                    className="absolute -top-3 -left-3 w-8 h-8 opacity-10 transition-colors duration-1000"
                    style={{ color: "var(--theme-color)" }}
                  />
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans pl-4 italic">
                    "{test.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom bio info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-black shadow-md transition-all duration-1000 flex-shrink-0"
                  style={{
                    backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)",
                    boxShadow: "0 4px 12px var(--theme-glow)"
                  }}
                >
                  {test.image}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight leading-tight">{test.name}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{test.role}</div>
                  <div 
                    className="text-xs font-semibold font-space-grotesk mt-0.5 transition-colors duration-1000"
                    style={{ color: "var(--theme-color)" }}
                  >
                    {test.pet}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Underneath Proof Factors with light staggered slide */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-40px" }}
        >
          {reviewsCount.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 text-center"
              variants={cardVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div 
                className="text-3xl font-bold text-transparent bg-clip-text mb-1 font-space-grotesk transition-all duration-1000"
                style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
              >
                {item.num}
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
