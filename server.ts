import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize dotenv in case of raw local hosting
import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // 1. API: Smart AI Username Generator route
  app.post('/api/gemini/generate', async (req, res) => {
    const { prompt, count = 10, style = 'modern' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.status(200).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured in Secrets.',
        fallback: true
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are an elite, modern startup username engine for branding and online hunters. 
Your goal is to output highly stylish, memorable, random, and rare usernames matching the user input theme.
The usernames must feel like high-end user handles (NOT clunky words mashed together), keeping them sleek and elegant. 
Provide exciting, creative definitions or tech-spirit tags of what each username represents.`;

      const userPrompt = `Generate a list of exactly ${count} unique usernames based on the theme or query: "${prompt}". 
The general desired style matches: "${style}". 
The usernames should vary in length between 3 and 10 characters. Some should be extremely short and rare (like OG names).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'List of generated premium usernames',
            items: {
              type: Type.OBJECT,
              properties: {
                text: {
                  type: Type.STRING,
                  description: 'The username string, e.g. "Xevin" or "q7x". Do not include spaces'
                },
                style: {
                  type: Type.STRING,
                  description: 'Style of the username, e.g. "OG", "RARE", "GAMING", "AESTHETIC"'
                },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '1 or 2 relevant tags, e.g. ["Active", "Discord"] or ["OG", "Short"]'
                },
                meaning: {
                  type: Type.STRING,
                  description: 'A stylish 1-sentence definition of its digital branding spirit'
                }
              },
              required: ['text', 'style', 'tags', 'meaning']
            }
          }
        }
      });

      const responseText = response.text || '[]';
      const parsedUsernames = JSON.parse(responseText.trim());

      res.json({
        success: true,
        usernames: parsedUsernames.map((u: any) => ({
          ...u,
          length: u.text.length,
          isAiGenerated: true
        }))
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'An error occurred during AI generation'
      });
    }
  });

  // 2. Client Assets Serving & SPA routing
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UserGen Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
