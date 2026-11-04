import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.APP_URL || `http://localhost:${port}`,
    'X-Title': 'OpenRouter Railway App',
  },
});

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OpenRouter + Railway API is running!',
  });
});

app.post('/api/chat', async (req, res) => {
  const { prompt, model = 'google/gemini-2.5-flash' } = req.body;

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({
      error: 'OPENROUTER_API_KEY is not configured. Please set it in your environment variables.',
    });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Field "prompt" is required in request body.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({
      model,
      response: completion.choices[0]?.message?.content || '',
    });
  } catch (error) {
    console.error('Error contacting OpenRouter:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while generating response.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
