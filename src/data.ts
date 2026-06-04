import { 
  Heart, 
  Target, 
  Trophy, 
  Users, 
  Droplet, 
  Zap, 
  Wifi, 
  Battery, 
  Brain, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  Activity, 
  Shield,
  MapPin,
  MessageCircle,
  Bell,
  User,
  LogIn,
  Settings
} from "lucide-react";

export interface Concept {
  icon: any;
  title: string;
  description: string;
}

export const conceptCards: Concept[] = [
  {
    icon: Heart,
    title: "Emotional Intelligence",
    description: "Unlike basic pet trackers, PetPulse AI creates a living emotional profile—understanding stress, joy, anxiety, and comfort patterns in real-time."
  },
  {
    icon: Target,
    title: "Target Market Fit",
    description: "Modern pet parents aged 25-45 who view their pets as family members and invest in premium wellness, technology, and emotional care solutions."
  },
  {
    icon: Trophy,
    title: "Unique Value Proposition",
    description: "The world's first AI system that translates pet behavior into human-understandable emotions, creating unprecedented insight into your pet's inner world."
  },
  {
    icon: Users,
    title: "Market Position",
    description: "Premium AI wellness technology—positioned between Fitbit's health tracking sophistication and Apple's intuitive design excellence, but for pets."
  }
];

export interface Spec {
  icon: any;
  label: string;
  detail: string;
}

export const collarSpecs: Spec[] = [
  {
    icon: Droplet,
    label: "Medical-Grade Silicone",
    detail: "Hypoallergenic, sweat-resistant, ultra-comfortable strap"
  },
  {
    icon: Zap,
    label: "Multi-Sensor Array",
    detail: "Tracks heart rate variability, motion, temperature, and vocal pitch"
  },
  {
    icon: Wifi,
    label: "Adaptive LED Ring",
    detail: "Glows cyan for calm, amber for alert, and pulses with detected emotions"
  },
  {
    icon: Battery,
    label: "7-Day Battery Life",
    detail: "Wireless induction charging dock, fast charges in 90 minutes"
  }
];

export interface Feature {
  icon: any;
  title: string;
  description: string;
}

export const aiFeatures: Feature[] = [
  {
    icon: Brain,
    title: "Vocal Sound Analysis",
    description: "AI-powered vocalization analysis decodes over 40 emotional states from your pet's sounds—distinguishing playfulness from distress, curiosity from anxiety."
  },
  {
    icon: TrendingUp,
    title: "Behavioral Prediction",
    description: "Machine learning models forecast your pet's needs before they escalate—predicting walks, meals, playtime, and rest cycles with 94% accuracy."
  },
  {
    icon: Sparkles,
    title: "Personality Mapping",
    description: "Continuous AI observation builds a unique personality profile—identifying traits like social confidence, curiosity levels, stress resilience, and energy patterns."
  },
  {
    icon: AlertTriangle,
    title: "Anxiety Detection",
    description: "Real-time stress markers monitor heart rate variability, movement patterns, and vocalization—alerting you the moment anxiety rises above baseline."
  },
  {
    icon: Activity,
    title: "Mood Forecasting",
    description: "Predictive algorithms learn daily rhythms and environmental triggers to forecast mood shifts—helping you plan activities when your pet feels most social."
  },
  {
    icon: Shield,
    title: "Smart Recommendations",
    description: "Context-aware AI suggests personalized care actions—from calming music playlists to optimal walk times based on your pet's emotional and physical state."
  }
];

export interface AppFeature {
  icon: any;
  title: string;
  description: string;
}

export const appFeatures: AppFeature[] = [
  {
    icon: Heart,
    title: "Emotion Dashboard",
    description: "Real-time mood visualization with historical trends and pattern recognition"
  },
  {
    icon: MapPin,
    title: "GPS & Geofencing",
    description: "Live location tracking with safe zone alerts and activity heatmaps"
  },
  {
    icon: MessageCircle,
    title: "AI Assistant Chat",
    description: "Ask questions about behavior, get personalized care recommendations"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Context-aware alerts only when they matter—no noise, just high-value insight"
  },
  {
    icon: Users,
    title: "Family Sharing",
    description: "Multiple users can monitor, collaborate on care, and share state updates"
  }
];

export interface Testimonial {
  name: string;
  role: string;
  pet: string;
  quote: string;
  rating: number;
  image: string;
}

export const testimonialsList: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Dog Owner • San Francisco",
    pet: "Golden Retriever, Luna",
    quote: "I've had pet trackers before, but PetPulse AI is different. It told me Luna was stressed before I even noticed. The AI caught her anxiety patterns and helped me adjust her routine. She's so much happier now.",
    rating: 5,
    image: "SM"
  },
  {
    name: "Marcus Chen",
    role: "Cat Owner • Austin",
    pet: "Siamese Cat, Milo",
    quote: "As someone in tech, I was skeptical about 'AI emotion detection.' But after two weeks, I'm convinced. Milo's personality profile is eerily accurate, and the mood forecasting actually works. Worth every penny.",
    rating: 5,
    image: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "Veterinarian • New York",
    pet: "Border Collie, Max",
    quote: "From a medical perspective, this is groundbreaking. The early stress detection helped me catch Max's separation anxiety before it became severe. The data is clinical-grade and genuinely useful for preventive care.",
    rating: 5,
    image: "ER"
  }
];

export interface VideoScene {
  time: string;
  scene: string;
  visual: string;
  camera: string;
  voiceover: string;
  music: string;
}

export const videoScenes: VideoScene[] = [
  {
    time: "0:00 - 0:08",
    scene: "Opening",
    visual: "Close-up: A dog's eyes, looking up at camera. Soft focus, warm golden hour lighting.",
    camera: "Macro lens, shallow depth of field, slow push-in",
    voiceover: "They can't tell you when they're scared...",
    music: "Soft piano, emotional, building"
  },
  {
    time: "0:08 - 0:15",
    scene: "Problem Setup",
    visual: "Owner leaving for work. Dog sits by door, visibly anxious. Tail is down.",
    camera: "Medium shot, handheld for realism, natural lighting",
    voiceover: "...or anxious. Or even when they're in pain.",
    music: "Piano continues, adds subtle strings"
  },
  {
    time: "0:15 - 0:22",
    scene: "Product Reveal",
    visual: "Smooth product shot: PetPulse AI collar rotating in studio lighting. Cyan LED glows.",
    camera: "Turntable shot, 4K resolution, cinematic lighting",
    voiceover: "Until now.",
    music: "Music swells — electronic elements introduced"
  },
  {
    time: "0:22 - 0:35",
    scene: "Technology Showcase",
    visual: "Motion graphics: Collar sensors visualized. Data flowing to phone. App UI animates in.",
    camera: "3D motion graphics, clean deep black background",
    voiceover: "PetPulse AI uses advanced artificial intelligence to decode your pet's emotions in real-time. Monitoring heart rate, behavior, vocalizations—translating them into insights you can understand.",
    music: "Tech-inspired synth, upbeat and modern"
  },
  {
    time: "0:35 - 0:45",
    scene: "Emotional Connection",
    visual: "Owner receives notification: 'Luna feels anxious.' Opens app, see mood dashboard.",
    camera: "Over-shoulder shot of phone screen, rack focus to owner's concerned face",
    voiceover: "Imagine knowing exactly how your pet feels—not just where they are, but what they need.",
    music: "Music softens, becomes warmer"
  },
  {
    time: "0:45 - 0:55",
    scene: "Lifestyle Montage",
    visual: "Happy moments: Owner plays with dog. Dog wears collar. App shows 'Playful & Energized.' Family smiling.",
    camera: "Handheld B-roll, natural lighting, golden hour",
    voiceover: "PetPulse AI helps you be the pet parent they deserve.",
    music: "Uplifting, emotional crescendo"
  },
  {
    time: "0:55 - 1:05",
    scene: "Feature Highlights",
    visual: "Quick cuts: GPS tracking. Mood timeline graph. AI assistant chat. Emergency alert.",
    camera: "Clean product shots, fast-paced editing",
    voiceover: "24/7 monitoring. Behavioral predictions. Personalized care recommendations. Emergency alerts.",
    music: "Tech beat intensifies, rhythmic"
  },
  {
    time: "1:05 - 1:15",
    scene: "Testimonial Feel",
    visual: "Real pet owner smiling with their dog (both wearing collar). Text overlay: 'It changed everything.' — Sarah M.",
    camera: "Portrait shot, soft natural light, authentic moment",
    voiceover: "Thousands of pet parents are already deepening their bond.",
    music: "Warm strings return"
  },
  {
    time: "1:15 - 1:25",
    scene: "Call to Action",
    visual: "Product shot: Collar + phone with app. Text animates: 'Reserve Yours Today' • Website URL",
    camera: "Hero product shot, studio lighting, slow zoom",
    voiceover: "Join the future of pet care. Reserve your PetPulse AI collar today.",
    music: "Full orchestral swell, triumphant"
  },
  {
    time: "1:25 - 1:30",
    scene: "Closing",
    visual: "Logo animation: PetPulse AI heart logo with glowing pulse rings. Tagline appears: 'Feel what they feel.'",
    camera: "Animated logo on black background",
    voiceover: "PetPulse AI. Feel what they feel.",
    music: "Brand jingle plays (8-second version)"
  }
];

export const adHeadlines = [
  "Finally understand what your pet is really feeling.",
  "They can't speak. But now, they don't have to.",
  "The collar that reads their heart, not just their location.",
  "Intelligence beyond tracking. Empathy beyond words.",
  "What if you could hear what your pet can't say?"
];

export const ctaLines = [
  "Reserve Your PetPulse AI Collar",
  "Join the Waitlist Today",
  "Pre-Order Now • Ships Spring 2026",
  "Experience the Future of Pet Care",
  "Feel the Difference • Reserve Yours"
];
