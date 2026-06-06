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

  // 2. API: AI Customized Identity builder route based on custom attributes (interests, personality, hobbies, style)
  app.post('/api/gemini/generate-identity', async (req, res) => {
    const { interests = '', personality = '', hobbies = '', style = '' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Graceful and highly randomized procedural generator fallback
      try {
        let fallbacks = [
          { first: 'Aarav', last: 'Sharma', nick: 'Vortex' },
          { first: 'Oliver', last: 'Smith', nick: 'Apex' },
          { first: 'Haruto', last: 'Sato', nick: 'Kage' },
          { first: 'Yuji', last: 'Kim', nick: 'Do-yun' },
          { first: 'Fatima', last: 'Haddad', nick: 'Yasmin' },
          { first: 'Alice', last: 'Martin', nick: 'Minimal' }
        ];

        const cleanStyle = style.trim() ? style.trim() : 'Mysterious';
        if (cleanStyle.toLowerCase().includes('anime')) {
          fallbacks = [
            { first: 'Satoru', last: 'Gojo', nick: 'TheStrongest' },
            { first: 'Madara', last: 'Uchiha', nick: 'Ghost' },
            { first: 'Marin', last: 'Kitagawa', nick: 'Cosplayer' },
            { first: 'Eren', last: 'Yeager', nick: 'Freedom' },
            { first: 'Mikasa', last: 'Ackerman', nick: 'Protector' },
            { first: 'Sasuke', last: 'Uchiha', nick: 'Avenger' }
          ];
        } else if (
          cleanStyle.toLowerCase().includes('hollywood') || 
          cleanStyle.toLowerCase().includes('hero') || 
          cleanStyle.toLowerCase().includes('man') ||
          cleanStyle.toLowerCase().includes('lander')
        ) {
          fallbacks = [
            { first: 'Tony', last: 'Stark', nick: 'IronMan' },
            { first: 'Bruce', last: 'Wayne', nick: 'Batman' },
            { first: 'Clark', last: 'Kent', nick: 'Superman' },
            { first: 'John', last: 'Lander', nick: 'Homelander' },
            { first: 'Peter', last: 'Parker', nick: 'SpiderMan' },
            { first: 'Logan', last: 'Howlett', nick: 'Wolverine' }
          ];
        }

        const base = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        const cleanInterests = interests.trim() ? interests.trim() : 'Digital exploring';
        const uName = `${base.first.toLowerCase()}_${base.nick.toLowerCase()}_${Math.floor(Math.random() * 99)}`;

        return res.json({
          success: true,
          isAiGenerated: false,
          identity: {
            firstName: base.first,
            lastName: base.last,
            username: uName,
            displayName: `${base.first} "${base.nick}" ${base.last}`,
            bio: `Exploring ${cleanInterests}. Living via ${cleanStyle} guidelines.`,
            description: `Interests: ${cleanInterests}. Personality: ${personality || 'Dynamic'}. Hobbies: ${hobbies || 'Creating'}. Formulated with custom structural styles in mind.`,
            tagline: `Pristine ${cleanStyle} operations online.`,
            socialHandles: {
              x: `@${uName}`,
              github: uName,
              twitch: `${uName}_live`,
              youtube: `@${uName}Official`
            },
            gamingAlias: `${base.nick}_${base.first}`
          },
          note: 'Using high-entropy server fallback'
        });
      } catch (err) {
        return res.status(500).json({ success: false, error: 'Failed' });
      }
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

      const sysInstruction = `You are an elite, modern Digital Identity generator. 
Given a user's interests, personality traits, hobbies, or preferred style descriptions, you output a cohesive, highly creative digital identity.
The generated elements MUST feel premium, highly custom, realistic, and meticulously designed. 
Ensure to populate all requested values with meaningful, ultra-polished, and realistic text blocks matching the input mood.`;

      const userPrompt = `Generate a complete digital identity package matching these custom user descriptions:
- Interests: "${interests}"
- Personality profile: "${personality}"
- Hobbies: "${hobbies}"
- Preferred style/category theme: "${style}"

Provide highly creative, realistic, and non-generic usernames and biographies. Do NOT use fake or placeholder labels.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: sysInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            description: 'Fully cohesive customized digital identity package',
            properties: {
              firstName: { type: Type.STRING, description: 'First name matching region appropriate to inputs or global' },
              lastName: { type: Type.STRING, description: 'Last name' },
              username: { type: Type.STRING, description: 'Dynamic, rare, high-end handle (letters/numbers/underscores only)' },
              displayName: { type: Type.STRING, description: 'Complete stylish nickname integrated display name' },
              bio: { type: Type.STRING, description: 'A sleek, catchy short bio under 80 characters' },
              description: { type: Type.STRING, description: 'A more detailed, deep about me or description under 180 characters' },
              tagline: { type: Type.STRING, description: 'A highly punchy one-liner slogan reflecting the style' },
              socialHandles: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.STRING, description: 'Twitter/X handle with @' },
                  github: { type: Type.STRING, description: 'GitHub username' },
                  twitch: { type: Type.STRING, description: 'Twitch channel suffix' },
                  youtube: { type: Type.STRING, description: 'YouTube handle with @' }
                },
                required: ['x', 'github', 'twitch', 'youtube']
              },
              gamingAlias: { type: Type.STRING, description: 'An premium FPS/sports gaming identifier' }
            },
            required: ['firstName', 'lastName', 'username', 'displayName', 'bio', 'description', 'tagline', 'socialHandles', 'gamingAlias']
          }
        }
      });

      const parsedIdentity = JSON.parse(response.text?.trim() || '{}');

      res.json({
        success: true,
        isAiGenerated: true,
        identity: parsedIdentity
      });
    } catch (err: any) {
      console.error('Core AI Identity Error:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'An error occurred during AI generation'
      });
    }
  });

  // 3. Client Assets Serving & SPA routing
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
