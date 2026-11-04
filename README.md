# OpenRouter + Railway Starter

A lightweight Node.js Express service configured for OpenRouter LLM completions and continuous deployment on Railway.

## Quick Start (Local)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your OpenRouter API key to `.env`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Deploying to Railway

1. Push this repository to GitHub or GitLab.
2. In Railway, click **+ New Project** -> **Deploy from GitHub repo**.
3. Select this repository.
4. In Railway project settings, go to **Variables** and add:
   - `OPENROUTER_API_KEY`: your OpenRouter API key.
5. Railway will automatically build and deploy the app!
