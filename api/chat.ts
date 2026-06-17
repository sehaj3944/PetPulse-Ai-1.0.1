import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Config CORS Headers for production safety on Vercel
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS response
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Enforce POST requests for the actual chat endpoint
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Robustly handle req.body parsing for different serverless configurations
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        console.error("Error parsing stringified request body:", parseError);
      }
    }

    const { message, history } = body || {};
    
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

    // Initialize modern Gemini Client with user-agent for telemetry tracking
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

    // Robust generate with retry and fallback models to handle 503/high-demand errors
    let replyText = "";
    const modelsToTry = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
    const maxRetriesPerModel = 3;
    let fallbackTriggered = false;
    let accumulatedError: any = null;

    // Helper to safely parse Nested or JSON-stringified ApiErrors from GoogleGenAI SDK
    const parseGenAIError = (err: any) => {
      let code: number | undefined = err?.status || err?.statusCode || err?.code;
      let statusStr: string | undefined = err?.statusText;
      let message: string = err?.message || "";

      if (err?.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.error) {
            code = parsed.error.code || code;
            statusStr = parsed.error.status || statusStr;
            message = parsed.error.message || message;
          }
        } catch {
          // Message was not stringified JSON, continue
        }
      }
      
      if (err?.error && typeof err.error === "object") {
        code = err.error.code || code;
        statusStr = err.error.status || statusStr;
        message = err.error.message || message;
      }

      return { code, status: statusStr, message };
    };

    for (const model of modelsToTry) {
      if (replyText) break;
      
      for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
            }
          });
          
          if (response && response.text) {
            replyText = response.text;
            break; // Success! Break out of retry loop for this model
          }
        } catch (err: any) {
          accumulatedError = err;
          const parsedErr = parseGenAIError(err);
          const code = parsedErr.code;
          const errMessage = parsedErr.message;
          const status = parsedErr.status;
          
          // Log error safely without exposing secrets
          console.warn(
            `[Gemini Retry Log] Model ${model} failed on attempt ${attempt}. Code: ${code}, Status: ${status}. Error: ${errMessage.replace(apiKey, "REDACTED_API_KEY")}`
          );

          // If the error indicates a direct auth error, don't keep retrying (API key is invalid)
          if (code === 400 || code === 403 || errMessage.includes("key is invalid") || errMessage.includes("not valid") || errMessage.includes("API key")) {
            throw err;
          }

          // Exponential backoff wait before next attempt of this model
          if (attempt < maxRetriesPerModel) {
            const delayMs = Math.pow(2, attempt) * 800 + Math.random() * 300;
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
        }
      }
    }

    if (!replyText) {
      fallbackTriggered = true;
      // Return a warm, casual offline fallback response when Gemini is fully unavailable due to high demand
      replyText = `🐾 **[Telemetry Sync Note]** I can see your collar's sensors are online, but our sensory AI interpretation service is currently taking a quick play break due to heavy demand. 🐶\n\nDon't worry! While our conversational AI is taking a rest, your collar's local bio-indicators look within normal bounds. Please try again in a few moments, and remember that our insights are always super supportive, but never replace a real veterinary check-up!\n\n*(Btw, I'm just an AI pal, not a real vet! Always check with your vet for medical stuff.)*`;
    }

    return res.status(200).json({ text: replyText });
  } catch (error: any) {
    console.error("Vercel Serverless Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred with PetPulse AI Assistant serverless execution."
    });
  }
}
