import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Enforce POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Get API Key securely from the server environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return a professional dynamic fallback if key isn't configured yet
      return res.status(200).json({
        text: `**[Demo Mode Active]** The PetPulse AI Assistant is ready! Please configure your \`GEMINI_API_KEY\` in the **Settings > Secrets** panel of AI Studio or your Vercel deployment variables to enable live answers.\n\n(Btw, I'm just an AI pal, not a real vet! Always check with your vet for medical stuff.)`
      });
    }

    // Initialize modern Gemini Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
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

    // Map conversation history format correctly for standard Gemini payload
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
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
    return res.status(200).json({ text: replyText });
  } catch (error: any) {
    console.error("Vercel Serverless Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred with PetPulse AI Assistant serverless execution."
    });
  }
}
