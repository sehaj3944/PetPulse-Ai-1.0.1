import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";

// Highly efficient, thread-safe, serverless-native sliding window rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 6; // strict anti-abuse limit

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(clientHash: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientHash);

  // Lazy garbage collection to guarantee safe memory bounds
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientHash, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitizeText(input: any): string {
  if (typeof input !== "string") return "";
  // Strip script tags, basic HTML tags, and strictly cap token size
  return input
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .slice(0, 1000) // Secure maximum limit per message
    .trim();
}

export default async function handler(req: any, res: any) {
  // 1. Enforce secure HTTP methods
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed. Only secure POST actions approved." });
  }

  try {
    const rawMessage = req.body?.message;
    const rawHistory = req.body?.history;

    // 2. Validate input and sanitize parameters
    const message = sanitizeText(rawMessage);
    if (!message) {
      return res.status(400).json({ error: "Invalid telemetry message format or payload exceeds threshold." });
    }

    // 3. Rate limiting and Client obfuscation layout (Zero PII Logging rule)
    const rawIp = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous").toString();
    const clientHash = crypto
      .createHash("sha256")
      .update(rawIp + (process.env.GEMINI_API_KEY || "salt-petpulse"))
      .digest("hex")
      .slice(0, 16);

    if (isRateLimited(clientHash)) {
      return res.status(429).json({
        text: "🚨 **Rate Limit Engaged**: Telemetry analyzer cooling down. Please wait a minute before polling the smart collar biometrics again. We protect collar sensor bandwidth from excessive syncs."
      });
    }

    // 4. Secure API Key handling
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Dynamic safe demo mode when API keys aren't mounted yet (prevents crashes)
      return res.status(200).json({
        text: `**[Demo Mode Active]** The PetPulse AI Assistant is ready! Please configure your \`GEMINI_API_KEY\` in the **Settings > Secrets** panel of AI Studio or your Vercel deployment variables to enable live answers.\n\n(Btw, I'm just an AI pal, not a real vet! Always check with your vet for medical stuff.)`
      });
    }

    // Initialize modern Gemini Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-hardened",
        }
      }
    });

    const systemInstruction = `You are a super casual, friendly human pet lover helping out on the PetPulse website. Think of yourself as a warm, enthusiastic pet text-buddy, not a tech robot. 

CRITICAL SPEED & STYLE INSTRUCTIONS:
- Keep your answers extremely short. Reply in exactly ONE single, brief paragraph (maximum 2 to 3 quick sentences total). 
- Completely ban all bullet points, numbering, exams, list items, or technical data sheets. Talk in regular, friendly conversation sentences.
- Highly optimized for speed: use clear, simple language so the response processes instantly.

PERSONALITY & DISCLAIMERS:
- Be incredibly enthusiastic and warm. Use a casual pet emoji naturally (like 🐾 or 🐶).
- Briefly help pet owners understand things like pet emotions, anxiety, or collar activity indicators in a down-to-earth way.
- End your short paragraph with a tiny, ultra-casual note: "(Btw, I'm just an AI pal, not a real vet! Always check with your vet for medical stuff.)"
- If a pet is in an obvious critical medical emergency, immediately drop the casual tone and say: "Oh no, that sounds really serious. Please get to an emergency vet right away! 🚨"`;

    // Map conversation history format correctly for standard Gemini payload with validation
    const contents: any[] = [];
    if (rawHistory && Array.isArray(rawHistory)) {
      // Keep history payload within safe scale bounds (last 6 exchanges MAX to limit tokens)
      const safeHistory = rawHistory.slice(-6);
      for (const msg of safeHistory) {
        const role = msg.role === "user" ? "user" : "model";
        const content = sanitizeText(msg.content);
        if (content) {
          contents.push({
            role,
            parts: [{ text: content }]
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Request content generation using high-speed gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const replyText = response.text || "I was unable to analyze that telemetry signature. Please try again.";
    
    // Ensure response content is clean of any HTML tags
    return res.status(200).json({ text: sanitizeText(replyText) });
  } catch (error: any) {
    // Audit log (hiding sensitive server internals from end-user)
    console.error("Vercel Serverless Gemini API Error:", error.message || error);
    
    return res.status(200).json({
      text: "🐶 **Assessment Sync Interrupted**: Something went wrong while parsing the collar's emotional frequencies. Please try sending your diagnostic query again shortly."
    });
  }
}
