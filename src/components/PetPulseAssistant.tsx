import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, PawPrint, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function PetPulseAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message on mount
  useEffect(() => {
    const historicalMessages = localStorage.getItem("petpulse_chat_history");
    if (historicalMessages) {
      try {
        const parsed = JSON.parse(historicalMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
        return;
      } catch (e) {
        console.error("Error loading chat history", e);
      }
    }

    // Default welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am your **PetPulse AI Companion**. I am linked directly to your pet's smart collar telemetry, continually monitoring continuous heart rate variability (HRV), body temperature, vocal pitch, and activity loops.\n\nHow can I help you decode your pet's physical and emotional needs today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Save messages to LocalStorage
  const saveHistory = (newMessages: Message[]) => {
    localStorage.setItem("petpulse_chat_history", JSON.stringify(newMessages));
  };

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Handle Send Message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setInputValue("");
    saveHistory(updatedMessages);

    try {
      // Map message structure for backend integration API
      const historyPayload = updatedMessages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Failed to receive telemetry evaluation response.");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: "assistant",
        content: data.text,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: "assistant",
        content: "⚠️ **Telemetry Sync Error**: I'm having difficulty connecting to our secure servers to scan the collar data. Please check your internet connection or register a standard key in **Settings > Secrets**.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear Chat History
  const clearHistory = () => {
    localStorage.removeItem("petpulse_chat_history");
    const defaultWelcome = [
      {
        id: "welcome",
        role: "assistant",
        content: "Telemetry logs re-calibrated. I am ready to analyze your pet's smart collar readings! What can I analyze next?",
        timestamp: new Date()
      }
    ];
    setMessages(defaultWelcome);
  };

  // Simple, robust parser to render bullet points, bold tags, and safety highlights gracefully without react-markdown bugs
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, idx) => {
      let element = line;
      
      // Parse list items
      const isListItem = line.startsWith("*") || line.startsWith("-");
      const cleanLine = isListItem ? line.substring(1).trim() : line;

      // Inline Bold formatting **text**
      const parts = cleanLine.split(/\*\*([^*]+)\*\*/g);
      const inlineFormatted = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-bold text-white text-shadow-sm">{part}</strong>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <li key={idx} className="ml-4 list-disc text-gray-300 mb-1.5 leading-relaxed text-xs">
            {inlineFormatted}
          </li>
        );
      }

      return (
        <p key={idx} className="mb-2 leading-relaxed text-xs text-gray-300">
          {inlineFormatted}
        </p>
      );
    });
  };

  const quickPrompts = [
    { label: "Anxiety Loops 🐕", prompt: "Explain how PetPulse AI identifies canine separation anxiety patterns." },
    { label: "Check Telemetry 📊", prompt: "What exact biometrics do your on-collar continuous optical and thermal sensors track?" },
    { label: "Emergency Safety Redirection 🚨", prompt: "Help! My cat is completely lethargic, cold, and unresponsive. What should I do?" },
    { label: "Calibrating HRV 💓", prompt: "Why is canine baseline Heart Rate Variability (HRV) different from feline HRV?" }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="petpulse-chat-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_0_30px_var(--theme-glow-vibrant)] text-black border border-white/25"
        style={{
          backgroundColor: "var(--theme-color)",
          color: "var(--theme-text-color)"
        }}
        aria-label="Toggle PetPulse Companion"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-6 h-6" />
          ) : (
            <div key="open" className="relative flex items-center justify-center">
              <PawPrint className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-1.5 -right-1.5 bg-red-500 w-2.5 h-2.5 rounded-full animate-ping" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Slide-out Sidebar Chat Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="petpulse-chat-drawer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] bg-[#0C0C12]/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden z-50 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-1000"
                  style={{ backgroundColor: "var(--theme-glow)" }}
                >
                  <PawPrint className="w-4 h-4" style={{ color: "var(--theme-color)" }} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white font-space-grotesk">PetPulse Companion</span>
                    <span className="bg-white/10 text-gray-400 font-mono text-[7px] px-1 rounded-sm tracking-widest uppercase">Telemetry AI</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-gray-400 font-mono">ON-COLLAR HUD FEED ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearHistory}
                  title="Recalibrate / Clear Logs"
                  className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs inline-block relative ${
                      m.role === "user"
                        ? "bg-slate-800 text-white border border-white/10"
                        : "bg-white/[0.03] text-gray-200 border border-white/5"
                    }`}
                  >
                    {/* Icon tags for context rendering */}
                    {m.role === "assistant" && m.content.includes("🚨") && (
                      <div className="flex items-center gap-1.5 text-[#ff4d4d] font-bold text-[10px] mb-2 border border-[#ff4d4d]/30 bg-[#ff4d4d]/10 px-2 py-0.5 rounded font-space-grotesk">
                        <AlertTriangle className="w-3 h-3" /> EMERGENCY DETECTED
                      </div>
                    )}
                    
                    {renderMessageContent(m.content)}
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1 px-1">
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center animate-spin"
                    style={{ borderTopColor: "var(--theme-color)" }}
                  >
                    <PawPrint className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--theme-color)" }} />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#4D9FFF] uppercase">Receiving sensory telemetry telemetry...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Predefined prompt helpers */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none items-center">
              <span className="text-[9px] text-gray-500 font-mono uppercase mr-1 flex-shrink-0">Quick Tests:</span>
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="px-2.5 py-1 text-[10px] font-space-grotesk rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-gray-300 transition-all cursor-pointer flex-shrink-0 disabled:opacity-50"
                >
                  {qp.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  disabled={isLoading}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about raw HRV triggers, body temp limits..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-color)] focus:border-[var(--theme-color)] transition-all disabled:opacity-50 placeholder-gray-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:scale-100"
                  style={{
                    backgroundColor: "var(--theme-color)",
                    color: "var(--theme-text-color)"
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2.5 px-1">
                <span className="text-[8px] text-gray-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Grounded in real telemetry benchmarks
                </span>
                <span className="text-[8px] text-gray-500 italic">Complementary to vet care</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
