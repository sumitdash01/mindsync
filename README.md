# MindSync - Modified with OpenAI Chat Integration

This project adds a small Express proxy to call OpenAI's Chat Completions API and a client-side chat UI.

## Quick start

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and set your OpenAI API key:
   ```
   cp .env.example .env
   # edit .env and set OPENAI_API_KEY
   ```

3. Run the server:
   ```
   npm start
   ```

4. Open `http://localhost:3000/index.html` in a browser, or serve the folder with a static server. The server listens on the port in `.env` (default 3000) for API calls.

## Notes
- The server proxies requests to OpenAI. Keep your API key secret.
- For production, secure the server (authentication, rate limits, input validation).
