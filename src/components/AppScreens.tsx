import React, { useState } from "react";
import { 
  Sparkles, 
  LogIn, 
  Heart, 
  User, 
  TrendingUp, 
  MapPin, 
  MessageCircle, 
  Settings,
  Battery,
  PawPrint
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function AppScreens() {
  // Simulating internal app states
  const [petName, setPetName] = useState("Luna");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab ] = useState("Activity");
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(78);
  const [currentMood, setCurrentMood ] = useState("Playful & Engaged");
  const [batteryLevel, setBatteryLevel] = useState(72);

  // GPS Simulation States
  const [isGeofenceActive, setIsGeofenceActive] = useState(true);
  const [petStatus, setPetStatus] = useState<"Home" | "Walking" | "Park">("Home");
  const [isSimulationTransitioning, setIsSimulationTransitioning] = useState(false);

  // Function to run GPS tracking movement simulation
  const startNavigationSimulation = () => {
    if (isSimulationTransitioning) return;
    setIsSimulationTransitioning(true);
    if (petStatus === "Home") {
      setPetStatus("Walking");
      setTimeout(() => {
        setPetStatus("Park");
        setIsSimulationTransitioning(false);
      }, 2000);
    } else {
      setPetStatus("Walking");
      setTimeout(() => {
        setPetStatus("Home");
        setIsSimulationTransitioning(false);
      }, 2000);
    }
  };

  // Function to randomize vitals in the dashboard simulator
  const randomizeMetrics = () => {
    setSimulatedHeartRate(Math.floor(Math.random() * (105 - 65) + 65));
    const moods = ["Playful & Engaged", "Calm & Relaxed", "Minor Separation Anxiety", "Deep Rest Cycle", "Highly Curious"];
    setCurrentMood(moods[Math.floor(Math.random() * moods.length)]);
    setBatteryLevel(Math.floor(Math.random() * (100 - 45) + 45));
  };

  const screens = [
    {
      name: "Splash View",
      icon: Sparkles,
      bg: "from-[#0A0A0F] to-[#1A1A2F]",
      content: (
        <div className="h-full flex flex-col items-center justify-center p-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 animate-bounce transition-all duration-1000"
            style={{ 
              backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)",
              boxShadow: "0 0 30px var(--theme-glow)"
            }}
          >
            <PawPrint className="w-7 h-7 text-black" fill="black" />
          </div>
          <div className="text-xl font-bold text-white mb-1 font-space-grotesk">PetPulse AI</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center font-mono">Feel what they feel</div>
        </div>
      )
    },
    {
      name: "Login Gateway",
      icon: LogIn,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full flex flex-col justify-between p-4 relative">
          <div className="pt-8">
            <div className="text-xl font-bold text-white mb-1 font-space-grotesk">Welcome Back</div>
            <p className="text-[10px] text-gray-400">Sign in to connect collar #PP-9902</p>
          </div>
          
          <div className="space-y-2 pb-6">
            <div className="h-9 bg-white/5 border border-white/10 rounded-lg flex items-center px-3">
              <span className="text-[10px] text-gray-400">parent@petpulse.com</span>
            </div>
            <div className="h-9 bg-white/5 border border-white/10 rounded-lg flex items-center px-3">
              <span className="text-[10px] text-gray-400">••••••••••••</span>
            </div>
            
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full h-9 hover:opacity-90 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500"
              style={{
                backgroundColor: "var(--theme-color)",
                color: "var(--theme-text-color)"
              }}
            >
              <span className="text-[11px] font-bold font-space-grotesk">Sign In</span>
            </button>
            <div className="text-[9px] text-center text-gray-500 hover:text-gray-400 cursor-pointer font-mono">Register New Collar</div>
          </div>
        </div>
      )
    },
    {
      name: "Dashboard",
      icon: Heart,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full p-4 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-bold font-mono">VITALS STREAM</span>
                <span className="text-sm font-bold text-white font-space-grotesk leading-tight">{petName}'s Day</span>
              </div>
              <button 
                onClick={randomizeMetrics} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs hover:scale-105 active:scale-95 transition-all duration-505"
                style={{
                  backgroundColor: "var(--theme-color)",
                  color: "var(--theme-text-color)"
                }}
                title="Randomize telemetry"
              >
                ⚡
              </button>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-xl p-3">
              <div className="text-[9px] text-gray-400 mb-1 font-mono">CURRENT MOOD STATE</div>
              <div className="text-xs font-bold text-white truncate">{currentMood}</div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${currentMood.length * 4}%`,
                    backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)"
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <span className="text-[8px] text-gray-400 block mb-0.5 font-mono">HEART RATE</span>
                <span className="text-xs font-bold text-white font-mono">{simulatedHeartRate} bpm</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <span className="text-[8px] text-gray-400 block mb-0.5 font-mono">DISTANCE</span>
                <span className="text-xs font-bold text-white font-mono">3.2 mi</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-2">
            <div 
              className="text-[8px] font-bold tracking-wider uppercase mb-0.5 transition-colors duration-1000 font-mono"
              style={{ color: "var(--theme-color)" }}
            >
              Neural Vibe
            </div>
            <p className="text-[9px] text-gray-300 leading-tight">
              {petName} shows a great rest efficiency score today. Walks recommended in 2hrs.
            </p>
          </div>
        </div>
      )
    },
    {
      name: "Biological Profile",
      icon: User,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-center">
              <div 
                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center font-bold text-base transition-all duration-1000"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)",
                  color: "var(--theme-text-color)"
                }}
              >
                {petName[0]}
              </div>
              <div className="text-sm font-bold text-white mt-1.5 font-space-grotesk">{petName}</div>
              <div className="text-[9px] text-gray-500 font-mono">Golden Retriever • 3 yrs old</div>
            </div>

            <div className="space-y-1.5 max-h-[140px] overflow-y-hidden hover:overflow-y-auto scroll-smooth no-scrollbar">
              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <span className="text-[8px] text-gray-500 block mb-1 font-mono">Personality Matrix</span>
                <div className="flex gap-1">
                  {["Empathic", "Curious", "Social"].map((trait) => (
                    <span 
                      key={trait} 
                      className="px-1.5 py-0.5 text-[8px] font-medium rounded border transition-all duration-1000 font-mono"
                      style={{
                        backgroundColor: "var(--theme-glow)",
                        color: "var(--theme-color)",
                        borderColor: "var(--theme-color-subtle)"
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <span className="text-[8px] text-gray-500 block mb-0.5 font-mono">Core Trigger</span>
                <span className="text-[9px] text-gray-300 block">Separation anxiety spike during departure rituals.</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] text-center text-gray-500 border-t border-white/5 pt-1.5 font-mono">
            MAPPED ON: APR 20, 2026
          </div>
        </div>
      )
    },
    {
      name: "Weekly Analytics",
      icon: TrendingUp,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-[8px] text-gray-500 uppercase block font-mono">Weekly Vibe Index</span>
              <span className="text-sm font-bold text-white font-space-grotesk">Vibe Score 8.4/10</span>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-xl p-2.5 text-center">
              <span className="text-[8px] text-gray-400 block uppercase font-mono">Joy Efficiency</span>
              <span 
                className="text-xl font-bold font-mono transition-colors duration-1000"
                style={{ color: "var(--theme-color)" }}
              >
                88%
              </span>
            </div>

            {/* Simulated bar chart */}
            <div className="space-y-1.5">
              {[
                { day: "Mon", w: "80%" },
                { day: "Tue", w: "65%" },
                { day: "Wed", w: "95%" },
                { day: "Thu", w: "70%" },
                { day: "Fri", w: "90%" }
              ].map((bar) => (
                <div key={bar.day} className="flex items-center gap-1.5">
                  <span className="text-[8px] text-gray-400 w-5 font-mono">{bar.day}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ 
                        width: bar.w,
                        backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)"
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="rounded-lg p-1.5 border transition-all duration-1000"
            style={{
              backgroundColor: "var(--theme-glow)",
              borderColor: "var(--theme-color-subtle)"
            }}
          >
            <span className="text-[9px] text-gray-300 block leading-tight">Mood indexes peak mid-afternoon during outdoor exercises.</span>
          </div>
        </div>
      )
    },
    {
      name: "GPS Live Tracking",
      icon: MapPin,
      bg: "from-[#0F0F1A] to-[#121226]",
      content: (
        <div className="h-full relative flex flex-col justify-between p-3 select-none overflow-hidden">
          {/* Subtle grid and background */}
          <div className="absolute inset-0 bg-[#0A0A16]" />
          
          {/* Neon grid pattern */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `radial-gradient(var(--theme-color) 0.5px, transparent 0.5px)`,
            backgroundSize: '12px 12px'
          }} />

          {/* SVG Map Lines & Landmarks */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 160 220">
            {/* Roads */}
            <path d="M 40,150 Q 80,135 120,70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 40,150 Q 80,135 120,70" fill="none" stroke="var(--theme-color)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" style={{ transition: "stroke 1s" }} />
            
            {/* Secondary roads */}
            <path d="M 10,95 L 150,95" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
            <path d="M 80,20 L 80,190" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
          </svg>

          {/* Top Status Banner */}
          <div className="relative z-10">
            <div className={`border rounded-xl p-2 transition-all duration-300 backdrop-blur-sm ${
              petStatus === "Home" 
                ? "bg-black/85 border-emerald-500/30" 
                : petStatus === "Walking" && isGeofenceActive
                ? "bg-red-950/90 border-red-500/50"
                : petStatus === "Walking"
                ? "bg-black/85 border-amber-500/30"
                : "bg-black/85 border-cyan-500/30"
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full relative flex items-center justify-center">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                    petStatus === "Home" 
                      ? "bg-emerald-400" 
                      : petStatus === "Walking" && isGeofenceActive
                      ? "bg-red-500"
                      : petStatus === "Walking"
                      ? "bg-amber-400"
                      : "bg-cyan-400"
                  }`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    petStatus === "Home" 
                      ? "bg-emerald-500" 
                      : petStatus === "Walking" && isGeofenceActive
                      ? "bg-red-500"
                      : petStatus === "Walking"
                      ? "bg-amber-500"
                      : "bg-cyan-500"
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold text-white truncate font-space-grotesk">
                    {petStatus === "Home" 
                      ? `${petName} is at Home` 
                      : petStatus === "Walking" && isGeofenceActive
                      ? "⚠️ Left Safe Area!"
                      : petStatus === "Walking"
                      ? `${petName} is Traveling...`
                      : `🏞️ ${petName} reached Park`}
                  </div>
                  <div className="text-[7.5px] text-gray-400 font-mono flex justify-between items-center mt-0.5">
                    <span>
                      {petStatus === "Home" 
                        ? "GPS: Local • Safe" 
                        : petStatus === "Walking"
                        ? "GPS: Active • 4.2 mph"
                        : "GPS: Parks • Connected"}
                    </span>
                    <span className="text-[7px] font-semibold transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="absolute inset-0 pointer-events-none mt-14 mb-14">
            
            {/* Geofence safe zone ring */}
            <div 
              className="absolute rounded-full border-2 border-dashed transition-all duration-500 flex items-center justify-center"
              style={{
                left: "40px",
                top: "150px",
                width: "56px",
                height: "56px",
                transform: "translate(-50%, -50%)",
                borderColor: !isGeofenceActive
                  ? "rgba(255,255,255,0.08)"
                  : (petStatus === "Walking" || petStatus === "Park")
                  ? "rgba(239, 68, 68, 0.4)" 
                  : "rgba(16, 185, 129, 0.4)" 
              }}
            >
              {isGeofenceActive && (petStatus === "Walking" || petStatus === "Park") && (
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full border-2 border-red-500/20 opacity-75" />
              )}
              {isGeofenceActive && (
                <span className={`text-[6px] font-bold ${
                  (petStatus === "Walking" || petStatus === "Park") ? "text-red-400" : "text-emerald-400"
                } bg-black/80 px-1 rounded border border-white/5 font-mono`}>
                  {(petStatus === "Walking" || petStatus === "Park") ? "BREACH" : "SAFE ZONE"}
                </span>
              )}
            </div>

            {/* Landmark Home */}
            <div 
              className="absolute flex flex-col items-center"
              style={{ left: "40px", top: "150px", transform: "translate(-50%, -50%)" }}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-[8px]">🏠</span>
              </div>
              <span className="text-[6.5px] text-gray-500 font-bold tracking-tight mt-0.5 font-mono">HOME</span>
            </div>

            {/* Landmark Park */}
            <div 
              className="absolute flex flex-col items-center"
              style={{ left: "120px", top: "70px", transform: "translate(-50%, -50%)" }}
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <span className="text-[8px]">🌳</span>
              </div>
              <span className="text-[6.5px] text-gray-500 font-bold tracking-tight mt-0.5 font-mono">PARK</span>
            </div>

            {petStatus === "Walking" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="text-[7px] text-gray-400 absolute" style={{left: "62px", top: "105px"}}>
                  <span className="animate-pulse transition-colors duration-1000" style={{ color: "var(--theme-color)" }}>🐾 Locating...</span>
                </div>
              </div>
            )}

            {/* Pet Tracker marker */}
            <motion.div
              className="absolute z-20"
              style={{ transform: "translate(-50%, -50%)" }}
              animate={{
                left: petStatus === "Home" ? "40px" : petStatus === "Walking" ? "80px" : "120px",
                top: petStatus === "Home" ? "150px" : petStatus === "Walking" ? "110px" : "70px",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <div className="relative cursor-pointer">
                <span className="absolute -inset-1.5 rounded-full blur-sm animate-pulse opacity-40 transition-all duration-1000" style={{ backgroundColor: "var(--theme-color)" }} />
                <span className="absolute -inset-3 border rounded-full animate-ping duration-1000 opacity-20 transition-all duration-1000" style={{ borderColor: "var(--theme-color)" }} />
                
                <div 
                  className="relative w-6 h-6 rounded-full border border-black flex items-center justify-center shadow-lg transition-all duration-1000"
                  style={{
                    backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)",
                    color: "var(--theme-text-color)"
                  }}
                >
                  <span className="text-[9px] font-black font-space-grotesk">
                    {petName ? petName[0].toUpperCase() : "L"}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom control buttons */}
          <div className="relative z-10 flex gap-1.5 pt-2 mt-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsGeofenceActive(!isGeofenceActive);
              }}
              className={`flex-1 h-8 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer border ${
                isGeofenceActive 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <span className="text-[8px] font-bold uppercase tracking-wider block font-mono">Geofence</span>
              <span className="text-[7px] font-mono opacity-80">
                {isGeofenceActive ? "ENABLED" : "MUTED"}
              </span>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                startNavigationSimulation();
              }}
              disabled={isSimulationTransitioning}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                isSimulationTransitioning 
                  ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed" 
                  : "hover:opacity-90 hover:scale-[1.02] active:scale-95 cursor-pointer text-black"
              }`}
              style={!isSimulationTransitioning ? {
                backgroundColor: "var(--theme-color)",
                color: "var(--theme-text-color)",
                boxShadow: "0 2px 10px var(--theme-glow)"
              } : undefined}
            >
              <span className="text-[8.5px] font-bold tracking-wide uppercase font-space-grotesk">
                {isSimulationTransitioning 
                  ? "Moving..." 
                  : petStatus === "Home" 
                  ? "Walk to Park" 
                  : "Return Home"}
              </span>
            </button>
          </div>
        </div>
      )
    },
    {
      name: "AI Insights Chat",
      icon: MessageCircle,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full flex flex-col justify-between p-4">
          <div className="space-y-3">
            <div>
              <span className="text-[9px] text-gray-400 uppercase block font-bold font-mono">Behavioral Copilot</span>
              <span className="text-sm font-bold text-white font-space-grotesk">{petName} Assistant</span>
            </div>

            <div className="space-y-2 max-h-[140px] overflow-y-hidden hover:overflow-y-auto scroll-smooth no-scrollbar pr-1">
              <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-none p-2 text-[9px] text-gray-300">
                Why does Luna seem stressed at 9 AM?
              </div>
              <div 
                className="rounded-xl rounded-br-none p-2 text-[8px] text-gray-100 space-y-1 border transition-all duration-1000"
                style={{
                  backgroundColor: "var(--theme-glow)",
                  borderColor: "var(--theme-color-subtle)"
                }}
              >
                <span>Minor anxiety detected when your vehicle keys chime. Heart rate increases 15%. Direct recommendation:</span>
                <span className="block text-[7px] text-gray-300">• Desensitize key sounds.</span>
              </div>
            </div>
          </div>

          <div className="h-8 bg-white/5 border border-white/10 rounded-lg flex items-center px-3 justify-between">
            <span className="text-[9px] text-gray-400">Ask about behavior...</span>
            <span className="text-[10px]">👉</span>
          </div>
        </div>
      )
    },
    {
      name: "Collar Options",
      icon: Settings,
      bg: "from-[#0A0A0F] to-[#0F0F1A]",
      content: (
        <div className="h-full p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-sm font-bold text-white block font-space-grotesk font-mono">Settings</span>
            
            <div className="space-y-1.5 h-[150px] overflow-y-hidden hover:overflow-y-auto scroll-smooth no-scrollbar pr-1">
              {["LED Ring Hue", "Collar Sync Frequency", "Quiet Hours", "Shared Parents", "Raw Vitals Export"].map((set) => (
                <div key={set} className="h-7 bg-white/5 hover:bg-white/10 min-w-full rounded-lg flex items-center justify-between px-2 cursor-pointer transition-colors border border-white/5">
                  <span className="text-[9px] text-white">{set}</span>
                  <span className="text-gray-500 text-[10px]">›</span>
                </div>
              ))}
            </div>
          </div>

          {/* Battery Status at bottom */}
          <div className="p-2 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[7px] text-gray-400 block font-mono">COLLAR BATTERY</span>
              <span className="text-[10px] font-bold text-white font-mono">{batteryLevel}% • 5 d</span>
            </div>
            <Battery className="w-5 h-5 text-green-400 animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#4D9FFF]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal 
          animation="cinematic-reveal"
          duration={900}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Interactive App Ecosystem
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-sans">
            Take a virtual tour of the PetPulse AI mobile dashboard. Try clicking interactive controllers within each phone simulation to preview live telemetry sync.
          </p>

          {/* Top global helper simulator controls */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">
              <span className="text-gray-400">Dog Name:</span>
              <input 
                type="text" 
                value={petName} 
                onChange={(e) => setPetName(e.target.value || "Luna")}
                className="bg-transparent focus:outline-none font-bold w-16 text-center border-b transition-all duration-1000"
                style={{
                  color: "var(--theme-color)",
                  borderColor: "var(--theme-color-subtle)"
                }}
                placeholder="Luna"
              />
            </div>
            <button 
              onClick={randomizeMetrics}
              className="px-4 py-1.5 text-xs font-semibold rounded-full hover:shadow-lg transition-all duration-500 cursor-pointer hover:scale-105"
              style={{
                backgroundColor: "var(--theme-color)",
                color: "var(--theme-text-color)",
                boxShadow: "0 4px 15px var(--theme-glow)"
              }}
            >
              Simulate Live Vitals Sync
            </button>
          </div>
        </ScrollReveal>

        {/* 8 Phone Mockups Grid, Staggered Slide In with Out-of-sync Idle Float */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {screens.map((screen, index) => {
            const IconComponent = screen.icon;
            return (
              <motion.div 
                key={index} 
                className="space-y-4 flex flex-col items-center"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1, margin: "-80px" }}
                transition={{ 
                  duration: 0.9, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: index * 0.08 
                }}
              >
                {/* Out-of-sync Floating wrapper for realistic physics effect */}
                <motion.div 
                  className="space-y-4 flex flex-col items-center"
                  animate={{
                    y: [0, -7, 0]
                  }}
                  transition={{
                    duration: 5 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15
                  }}
                >
                  {/* Physical Phone Casing Mockup */}
                  <div 
                    className="relative w-[180px] aspect-[9/19] bg-[#0A0A0F] rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:scale-[1.04] transition-all duration-350 border-4 border-white/5 cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--theme-color)";
                      e.currentTarget.style.boxShadow = "0 15px 45px -10px var(--theme-glow), 0 0 15px var(--theme-glow-subtle)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.boxShadow = "0 0 40px rgba(0,0,0,0.65)";
                    }}
                  >
                    {/* Phone Bezel Interior Screen */}
                    <div className={`absolute inset-2.5 rounded-[2rem] overflow-hidden bg-gradient-to-br ${screen.bg} border border-white/10 select-none`}>
                      {/* Speaker camera bar "notch" */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-1.5" />
                        <span className="w-8 h-1 rounded-full bg-white/10" />
                      </div>
                      {/* Screen HTML Content */}
                      <div className="h-full pt-4 relative">
                        {screen.content}
                      </div>
                    </div>
                  </div>

                  {/* Subtile Badge */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:border-white/25 transition-colors cursor-pointer">
                      <IconComponent className="w-3 h-3 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
                      <span className="text-[10px] text-gray-300 font-medium tracking-tight">
                        {screen.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
