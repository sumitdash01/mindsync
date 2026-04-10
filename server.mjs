// server.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const PORT = process.env.PORT || 3000;

// Serve static frontend files (index.html, style.css, app.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

// Backend endpoint that proxies to OpenAI Chat Completions
app.post('/api/chat', async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.messages) return res.status(400).json({ error: 'Missing messages array in body' });

    if (!OPENAI_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured on server (OPENAI_API_KEY)' });
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: body.messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const text = await r.text();
    if (!r.ok) {
      // forward backend error text
      return res.status(r.status).json({ error: text });
    }

    const data = JSON.parse(text);
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} (serving static files and /api/chat)`);
});
