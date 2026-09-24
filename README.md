# Roleplay Studio — Deployment Ready

This project is structured as a Node.js web service with a responsive frontend.

## Easiest deployment: Render

1. Create a GitHub repository and upload the contents of this folder.
2. Sign in to Render and create a **Web Service** from the repository.
3. Render can use the included `render.yaml`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy.
7. Open the generated HTTPS URL on your phone.

## Alternative: Vercel

A `vercel.json` is included. Import the repository into Vercel and deploy. The Node endpoint can serve the app, although Render is the simpler fit for this Express starter.

## Important: AI API keys

The current `/api/chat` route is a demo endpoint. To make characters actually respond with an AI model, connect your chosen AI provider inside `server.js`.

Keep secrets in the hosting provider's environment-variable settings. Do NOT put an API key in `public/app.js`, `index.html`, or any other browser-side file.

## Mobile

After deployment, the site is accessible from Android/iPhone browsers through the HTTPS URL. No Node.js installation is required on the phone.

## Production checklist

- Add an AI provider to `/api/chat`
- Add authentication if accounts are needed
- Add a database for saved characters/conversations
- Add rate limiting and abuse protection
- Add moderation/safety controls appropriate to the content you allow
- Set environment variables in the host dashboard
