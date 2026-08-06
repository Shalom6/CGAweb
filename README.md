# Canadian Gospel Artistes

Official site for **Canadian Gospel Artistes**, spotlighting the **All About Jesus** annual music concert.

## Stack

- **React** (Vite) — frontend
- **Node / Express** — API for event, artists, and RSVP
- **Framer Motion** — motion and scroll effects

## Run locally

```bash
npm run dev
```

- Site: http://localhost:5173  
- API: http://localhost:5000  

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start API + Vite together |
| `npm run build` | Install client deps + build for production / Vercel |
| `npm start` | Serve the built app via Express (local/prod Node host) |

## Deploy on Vercel

1. Import the GitHub repo with **Root Directory** left as the repo root (do not set it to `client`).
2. Vercel uses `vercel.json`:
   - **Build Command:** `npm run build`
   - **Output Directory:** `client/dist`
3. API routes live in `/api` as serverless functions (`/api/site`, `/api/event`, `/api/artists`, etc.).
4. Push to `main` and redeploy.

## Event

- **All About Jesus** (Annual Music Concert)
- Saturday 1st August, 2026 · 5PM
- 2226 Hanselman Ave, Saskatoon, SK S7L 6A4
