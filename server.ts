import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function ensureFavicon() {
  const publicDir = path.join(process.cwd(), "public");
  const assetsDir = path.join(publicDir, "assets");
  const faviconPath = path.join(assetsDir, "petpulse-logo.png");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  if (!fs.existsSync(faviconPath)) {
    console.log("Generating default favicon at:", faviconPath);
    // Base64 of a beautiful high-quality paw icon PNG
    const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAMHRleHQgU29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ2RxMVgqAAADdklEQVR42uWbS08UURSFv9tVDXETXzGOMfERt5pIdIFfMAn8C/4DMy406EIDbsYv9GvcaFxIEg0mxhgTExMDpAbE6UfX7bYZaB7b0D6mpxvSTTrpqm6fOtXnnHvrXpZSyj72se8hNToYj5o6Q09g9Z3XgXpDA7mAsRswIICxB+AALGAXgAOwgF0ADsACdqEGDKhZ0/R0rMlo+Nkwp/3VqVOnGv0mH61G9vBveZ6rUav9D6LreY1+p9Xo99X+atTqPxd9z7v62qPfc/pGo990NfpuD77p6reZfVvdW6731u98b6v79tNvtRpt7369t632N7v7u6uO9b236li/fNXV6Pccu5/qPof2x3L7Hq6OPexb9LCHv4v/bUDU0BnoCYye88X8eY8zMDfQQC5g7Ab8AgaCAb8M0NfwwP8A0EguYFAD0JgB6I8BaFwD0KgBqH8D0JgBqF8D0KgBqHpP0O0S7v8NoE9mAD6ZAfhkBhAtC0AsK0AsO0C0LgAtAsAjADwSAHgEgEcCIEkBqO4XoLIDRI0ZIMoPEOUMIEofYDR2gKgxA0SNGeAvG6D6AFAgBgg7YgAtAoDGAIDGAIDGAIDGAIDGAIDGAIDGAIDGAIAv9QvCjhgg7IgBtAoAGgPAkgUAtBEAtBQAaj0AbS0AbU0A/Y0DQLMCUD0ArCgAtSgAIgCguS8gYvTbyP9nALCqH8AyAEC5ALArX0AsLcAHAQAqR0AoRwAoVwAoVwAoVwAoVwAoVwAoVwAoRwCocuX80P4AsUOfIOz6DNBm9Bv93gAitD9AtBggWgwQIbIAsVwf4Iv8AsQKfUGV6wuqXN//qP0BVsECuCMACOUIECIKEMsVALHIAsAHAQDg3/mAnf9tgN9iAF+09wH+ogHevscAvscA9r7HALHDAHYvA9j7DGDvy8S4n0Bovv9DGBpAYDKY4DqY4A8xgA6mQDg0y+AhXfEAHbEAPZ+xwDufscA+mIAX8QDmN6LAdxdAbgOAYDDAODR0RfY6OzoC+zxI2/pC6T+/L+0R8Xqf99p0p4V66/vNGnPFbOvd2fF9E/tU7E+92bF7lKxdI+KlXtUrM+9WdH+62dH29O5t6dbu5PtfbK0O+mvaO9Of/P4P6W/uf98v1n7i6W/i3e9ZscD2Me+s/wbAFG86gXh1FksAAAAAElFTkSuQmCC";

    try {
      const buffer = Buffer.from(base64Png, "base64");
      fs.writeFileSync(faviconPath, buffer);
      console.log("Favicon written successfully via base64 fallback.");
    } catch (err) {
      console.error("Error writing base64 fallback:", err);
    }

    // Try downloading a higher-resolution cute custom cyan paw in the background
    const downloadUrl = "https://img.icons8.com/ios-filled/128/00ffff/paw-print.png";
    https.get(downloadUrl, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(faviconPath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Favicon updated with high-resolution cyan paw-print successfully.");
        });
      }
    }).on("error", (err: any) => {
      console.log("Network direct download failed, relying on built-in base64 logo:", err.message);
    });
  }
}

async function startServer() {
  ensureFavicon();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on server-side
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // API Route for PetPulse AI Assistant Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        // Fallback response when GEMINI_API_KEY is not set/available yet
        return res.json({
          text: `**[Demo Mode Active]** The PetPulse AI Assistant is ready! Please configure your \`GEMINI_API_KEY\` in the **Settings > Secrets** panel of AI Studio to enable real-time replies from Gemini.\n\n*   **Telemetry Report**: On-collar continuous bio-sensors are calibrating.\n*   **HRV Status**: Heart rate variability indicates standard puppy/kitten baselines.\n*   *Safety Reminder*: Please note that while we provide behavioral telemetry feedback, our insights always complement, but never replace, professional hands-on veterinary care.*`
        });
      }

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

      // Format messages into Content array for Gemini SDK.
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

      // Use modern and fast model
      const gRes = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const replyText = gRes.text || "I was unable to analyze that telemetry signature. Please try again.";
      res.json({ text: replyText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "An error occurred with PetPulse AI Assistant." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
