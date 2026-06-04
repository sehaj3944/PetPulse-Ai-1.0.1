import React from "react";
import { PawPrint } from "lucide-react";

interface NavigationProps {
  onReserveClick: () => void;
}

export default function Navigation({ onReserveClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/10" id="navbar">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-1000 shadow-[0_0_20px_var(--theme-glow)]"
            style={{ backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)" }}
          >
            <PawPrint className="w-5 h-5 text-black" fill="black" />
          </div>
          <span className="text-xl font-space-grotesk font-semibold text-white tracking-tight">
            PetPulse <span className="transition-all duration-1000" style={{ color: "var(--theme-color)" }}>AI</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#product" className="text-sm text-gray-400 hover:text-white transition-colors">
            Product
          </a>
          <a href="#specs" className="text-sm text-gray-400 hover:text-white transition-colors">
            Collar Design
          </a>
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
            AI Technology
          </a>
          <a href="#app" className="text-sm text-gray-400 hover:text-white transition-colors">
            App Ecosystem
          </a>
          <button 
            onClick={onReserveClick}
            className="px-6 py-2 text-sm font-bold rounded-full transition-all duration-500 cursor-pointer transform hover:scale-105 active:scale-95 hover:brightness-110"
            style={{ 
              backgroundColor: "var(--theme-color)",
              color: "var(--theme-text-color)",
              boxShadow: "0 4px 15px var(--theme-glow)"
            }}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </nav>
  );
}
