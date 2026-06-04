import React, { useState } from "react";
import { Mail, Phone, MapPin, PawPrint } from "lucide-react";

export default function Footer() {
  const [emailSub, setEmailSub] = useState("");
  const [subStatus, setSubStatus] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubStatus("Successfully Subscribed!");
    setEmailSub("");
    setTimeout(() => setSubStatus(null), 3000);
  };

  const links = {
    product: [
      { label: "Hardware Features", href: "#features" },
      { label: "Device Integrity", href: "#specs" },
      { label: "App Companion", href: "#app" },
      { label: "Design System", href: "#design" }
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "AI Vet Advisory", href: "#" },
      { label: "Press Asset Kit", href: "#" },
      { label: "Careers", href: "#" }
    ],
    support: [
      { label: "Sizing Guide", href: "#" },
      { label: "Pre-order Shipping", href: "#" },
      { label: "Warranty Policy", href: "#" },
      { label: "Contact Developer", href: "#" }
    ]
  };

  return (
    <footer className="relative bg-black/80 border-t border-white/10 py-16 px-6 overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-px transition-all duration-1000" 
        style={{ backgroundImage: "linear-gradient(to right, transparent, var(--theme-color), transparent)", opacity: 0.4 }}
      />
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1 Logo & Contacts */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-1000"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--theme-color), #4D9FFF)",
                  boxShadow: "0 0 20px var(--theme-glow)"
                }}
              >
                <PawPrint className="w-5 h-5 text-black" fill="black" />
              </div>
              <span className="text-xl font-space-grotesk font-semibold text-white tracking-tight">PetPulse AI</span>
            </div>
            
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-sm">
              The world's first emotion-aware smart pet collar system. Translate behavior into objective understanding to secure a happier, more empathetic bond with your pet.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
                <Mail className="w-4 h-4 transition-all duration-1000" style={{ color: "var(--theme-color)" }} />
                <span>hello@petpulseai.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
                <Phone className="w-4 h-4 transition-all duration-1000" style={{ color: "var(--theme-color)" }} />
                <span>1-800-PET-PULSE</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
                <MapPin className="w-4 h-4 transition-all duration-1000" style={{ color: "var(--theme-color)" }} />
                <span>San Francisco, California</span>
              </div>
            </div>
          </div>

          {/* Column 2 Directories */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">Product Specs</div>
            <ul className="space-y-3">
              {links.product.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = ""}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 Directories */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">Company</div>
            <ul className="space-y-3">
              {links.company.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = ""}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 Directories */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">Support</div>
            <ul className="space-y-3">
              {links.support.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors font-medium"
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = ""}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter bottom signup bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 flex flex-col md:flex-row shadow-lg md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-2 h-full pointer-events-none transition-all duration-1000" 
            style={{ backgroundColor: "var(--theme-color)" }}
          />
          
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-space-grotesk">Stay Updated on Early Offers</h4>
            <p className="text-xs text-gray-400">Join our newsletter to receive brand updates on sizing releases and technical reports.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input 
                required
                type="email" 
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder={subStatus ? subStatus : "Enter your email"}
                className={`px-5 py-3 bg-black/40 border rounded-full text-xs text-white placeholder-gray-500 focus:outline-none transition-all duration-300 w-full sm:min-w-[180px] md:min-w-[240px] ${
                  subStatus ? "border-green-400/50 text-green-400 placeholder-green-400 font-bold" : "border-white/10"
                }`}
                onFocus={(e) => { if (!subStatus) e.target.style.borderColor = "var(--theme-color)"; }}
                onBlur={(e) => { if (!subStatus) e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 text-xs font-bold rounded-full transition-all duration-500 cursor-pointer flex-shrink-0 hover:brightness-110 w-full sm:w-auto text-center"
              style={{
                backgroundColor: "var(--theme-color)",
                color: "var(--theme-text-color)",
                boxShadow: "0 4px 15px var(--theme-glow)"
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Disclaimers & Social footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-white/10 text-xs text-gray-500">
          <div>© 2026 PetPulse AI™ Systems. All rights reserved. Designed for optimal empathy.</div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="transition-colors text-gray-400 hover:text-white"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="transition-colors text-gray-400 hover:text-white"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
            >
              Terms of Use
            </a>
            <a 
              href="#" 
              className="transition-colors text-gray-400 hover:text-white"
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-color)"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
            >
              Cookies Settings
            </a>
          </div>

          <div className="flex items-center gap-3">
            {["𝕏", "in", "IG"].map((soc, idx) => (
              <a 
                key={idx}
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border flex items-center justify-center text-white text-xs font-semibold transition-all duration-300 hover:scale-105"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--theme-color)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {soc}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
