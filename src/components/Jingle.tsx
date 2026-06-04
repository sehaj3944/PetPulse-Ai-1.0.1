import React, { useState, useRef, useEffect } from "react";
import { Music, Play, Square, Activity } from "lucide-react";
import { motion } from "motion/react";

const equalizerKeyframes = `
  @keyframes bounceEqualizer-1 {
    0%, 100% { height: 4px; }
    50% { height: 18px; }
  }
  @keyframes bounceEqualizer-2 {
    0%, 100% { height: 6px; }
    50% { height: 24px; }
  }
  @keyframes bounceEqualizer-3 {
    0%, 100% { height: 3px; }
    50% { height: 15px; }
  }
  @keyframes bounceEqualizer-4 {
    0%, 100% { height: 5px; }
    50% { height: 21px; }
  }
  @keyframes bounceEqualizer-5 {
    0%, 100% { height: 4px; }
    50% { height: 17px; }
  }
`;

export default function Jingle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current && AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          const analyserNode = ctx.createAnalyser();
          analyserNode.fftSize = 64; // neat & elegant 32 bars
          analyserRef.current = analyserNode;

          const sourceNode = ctx.createMediaElementSource(audioRef.current);
          sourceNode.connect(analyserNode);
          analyserNode.connect(ctx.destination);
          sourceRef.current = sourceNode;
        }

        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
      } catch (err) {
        console.warn("Web Audio Analyser hook failed (expected simple playback):", err);
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  // Handle auto-ending set play status back to false
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    el.addEventListener("ended", handleEnded);
    return () => {
      el.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Cleanup effect on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Audio Visualizer loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 1.8;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * height * 0.9;

          // Theme color representation (matches active theme variables)
          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, "rgba(0, 229, 255, 0.15)");
          gradient.addColorStop(0.5, "rgba(0, 229, 255, 0.8)");
          gradient.addColorStop(1, "#4D9FFF");

          ctx.fillStyle = gradient;
          // Smooth rounded visualizer bars
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, height - barHeight, barWidth - 2, barHeight, 3);
          } else {
            ctx.rect(x, height - barHeight, barWidth - 2, barHeight);
          }
          ctx.fill();

          x += barWidth;
        }
      } else {
        // Ambient rest state (glowing horizontal waves representing heartbeat/pulse rate)
        ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const sliceWidth = width / 60;
        let x = 0;
        for (let i = 0; i < 60; i++) {
          const wavePhase = Date.now() * 0.0035;
          const y = height / 2 + Math.sin(i * 0.12 - wavePhase) * 4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <section className="relative py-32 px-6">
      <style>{equalizerKeyframes}</style>
      <div 
        className="absolute top-[20%] right-[10%] w-80 h-80 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 opacity-[0.05]" 
        style={{ backgroundImage: "radial-gradient(circle, var(--theme-color), transparent)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <Music className="w-4 h-4 transition-colors duration-1000" style={{ color: "var(--theme-color)" }} />
            <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider font-mono">Acoustic Signature</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white leading-tight">
            Sonic Branding
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Listen to our official brand theme, <strong className="text-white">"Beside Them Always"</strong>, custom-crafted to communicate connection, reassurance, and premium warmth.
          </p>
        </motion.div>

        {/* Animated Lyric Display Container */}
        <motion.div 
          className="bg-gradient-to-br from-white/10 to-[#1A1A2F]/20 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ 
            boxShadow: "0 15px 40px -15px var(--theme-glow)"
          }}
        >
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#AB47BC] opacity-10 blur-3xl rounded-full" />

          {/* Hidden reference audio element for local playback */}
          <audio ref={audioRef} src="/Beside_Them_Always.mp3" preload="auto" />
          
          <div className="text-center space-y-6 mb-12">
            <div 
              className="text-2xl md:text-3xl font-space-grotesk font-black text-transparent bg-clip-text leading-relaxed italic transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
            >
              "Every heartbeat tells a story,"
            </div>
            <div className="text-2xl md:text-3xl font-space-grotesk font-black text-white leading-relaxed italic selection:bg-cyan-500/20">
              "Every moment, every sound,"
            </div>
            <div 
              className="text-2xl md:text-3xl font-space-grotesk font-black text-transparent bg-clip-text leading-relaxed italic transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, var(--theme-color), #4D9FFF)" }}
            >
              "PetPulse AI beside them always,"
            </div>
            <div 
              className="text-2xl md:text-3xl font-space-grotesk font-black text-transparent bg-clip-text leading-relaxed italic transition-all duration-1000"
              style={{ backgroundImage: "linear-gradient(to right, #4D9FFF, #AB47BC)" }}
            >
              "Love and care all around."
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-8">
            {/* Live Analyzer Audio Wave Visualizer matching user request */}
            <div className={`w-full h-24 bg-black/50 rounded-2xl overflow-hidden border transition-all duration-500 flex items-center justify-center relative shadow-inner ${isPlaying ? "border-[rgba(0,229,255,0.35)] shadow-[0_0_20px_rgba(0,229,255,0.1)]" : "border-white/5"}`}>
              <div className="absolute top-3 left-4 flex items-center gap-2">
                <Activity className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : "opacity-40"}`} style={{ color: "var(--theme-color)" }} />
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Live Pulse Waveform</span>
              </div>
              <canvas ref={canvasRef} className="w-full h-full block" width={400} height={96} />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              {/* Glassmorphism button with dynamic state, mini responsive equalizer */}
              <button 
                onClick={togglePlayback}
                id="play-jingle-button"
                className="group relative px-10 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer border overflow-hidden backdrop-blur-md active:scale-[0.97]"
                style={{
                  backgroundColor: isPlaying 
                    ? "rgba(239, 68, 68, 0.12)" 
                    : "rgba(0, 229, 255, 0.08)",
                  color: isPlaying ? "#FF4B4B" : "white",
                  borderColor: isPlaying ? "#EF4444" : "rgba(0, 229, 255, 0.35)",
                  boxShadow: isPlaying 
                    ? "0 0 30px rgba(239, 68, 68, 0.25)" 
                    : "0 0 25px rgba(0, 229, 255, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
                }}
              >
                {/* Visual state icon updates */}
                {isPlaying ? (
                  <>
                    <Square className="w-5 h-5 fill-current animate-pulse" />
                    <span className="font-space-grotesk font-bold tracking-wide">Pause Jingle</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-space-grotesk font-bold tracking-wide">Play Jingle</span>
                  </>
                )}

                {/* Sub-component Equalizer inside button */}
                <div className="flex items-end gap-[3px] h-6 w-9 pl-1">
                  <span className="w-[3px] rounded-full transition-all duration-500" style={{ backgroundColor: isPlaying ? "#FF4B4B" : "var(--theme-color)", animation: isPlaying ? "bounceEqualizer-1 0.8s ease-in-out infinite" : "none", height: "5px" }}></span>
                  <span className="w-[3px] rounded-full transition-all duration-500" style={{ backgroundColor: isPlaying ? "#FF4B4B" : "var(--theme-color)", animation: isPlaying ? "bounceEqualizer-2 1.1s ease-in-out infinite" : "none", height: "7px" }}></span>
                  <span className="w-[3px] rounded-full transition-all duration-500" style={{ backgroundColor: isPlaying ? "#FF4B4B" : "var(--theme-color)", animation: isPlaying ? "bounceEqualizer-3 0.6s ease-in-out infinite" : "none", height: "4px" }}></span>
                  <span className="w-[3px] rounded-full transition-all duration-500" style={{ backgroundColor: isPlaying ? "#FF4B4B" : "var(--theme-color)", animation: isPlaying ? "bounceEqualizer-4 0.9s ease-in-out infinite" : "none", height: "6px" }}></span>
                  <span className="w-[3px] rounded-full transition-all duration-500" style={{ backgroundColor: isPlaying ? "#FF4B4B" : "var(--theme-color)", animation: isPlaying ? "bounceEqualizer-5 0.7s ease-in-out infinite" : "none", height: "5px" }}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Technical Audio Config specs inside grids */}
          <div className="grid md:grid-cols-3 gap-6 border-t border-white/10 pt-8 mt-12">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1 font-mono">Theme Title</span>
              <div className="text-lg font-bold text-white truncate" title="Beside Them Always">Beside Them Always</div>
              <p className="text-xs text-gray-400 mt-1">Official PetPulse AI signature sound reflecting deep emotional connection.</p>
            </div>
            <div className="p-4 bg-[#0A0A12] border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1 font-mono">Acoustic Specs</span>
              <div className="text-lg font-bold text-white">High Fidelity • Stereo</div>
              <p className="text-xs text-gray-400 mt-1">High-quality audio streams mapped to biometrics pitch curves for realistic resonance.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1 font-mono">Experience Loop</span>
              <div className="text-lg font-bold text-white">Realtime Wave Process</div>
              <p className="text-xs text-gray-400 mt-1">Generates dynamic, interactive cardiac frequencies through standard Web Audio API models.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
