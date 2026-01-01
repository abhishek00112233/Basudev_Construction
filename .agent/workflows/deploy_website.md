---
description: Deploy Basudev Construction full‑stack website online
---

# Overview
This workflow outlines how to host the **Basudev Construction** project (React + Vite frontend, Node/Express backend) on popular cloud platforms.

## Prerequisites
1. **GitHub repository** – push the current code to a new repo (e.g., `github.com/youruser/basudev-construction`).
2. **Node.js** – version 20+ on the host.
3. **MongoDB** – a cloud‑hosted Atlas cluster (or any remote MongoDB URI).
4. **Environment variables** – create a `.env` file for the backend with:
   ```
   MONGODB_URI=<your‑atlas‑connection‑string>
   JWT_SECRET=<strong‑random‑secret>
   PORT=5000   # optional, Render will set its own
   ```
   The frontend reads `VITE_API_URL` – set it to the backend URL after deployment.

## 1. Push code to GitHub
```bash
cd "C:/Users/kyabh/Desktop/Basudev Construction"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your‑user>/basudev-construction.git
git push -u origin main
```

## 2. Deploy the **backend** (Render example)
1. Sign up at https://render.com and create a **New Web Service**.
2. Connect the GitHub repo.
3. Set **Build Command**: `npm install && npm run build` (if you have a build script; otherwise just `npm install`).
4. Set **Start Command**: `npm run server` (or `node server.js`).
5. Add the environment variables from your local `.env` (MONGODB_URI, JWT_SECRET, PORT).
6. Choose **Node** runtime, default region, and click **Create Web Service**.
7. Render will give you a URL like `https://basudev-construction-backend.onrender.com`.

## 3. Deploy the **frontend** (Vercel example)
1. Sign up at https://vercel.com and import the same GitHub repo.
2. Vercel automatically detects a Vite project. Set the **Framework Preset** to **Vite**.
3. In **Environment Variables**, add:
   - `VITE_API_URL` → `https://basudev-construction-backend.onrender.com`
4. Deploy. Vercel will provide a URL like `https://basudev-construction.vercel.app`.

## 4. Verify
- Open the Vercel URL, try logging in with `bs@gmail.com / bs@12345`.
- Ensure the admin dashboard loads and the error message works for wrong credentials.
- Check the backend logs on Render for any connection issues.

## 5. Optional: Docker deployment (single‑server)
If you prefer a single Docker container:
1. Create a `Dockerfile` in the project root:
   ```dockerfile
   # ---- Backend ----
   FROM node:20-alpine AS backend
   WORKDIR /app/backend
   COPY backend/package*.json ./
   RUN npm ci --omit=dev
   COPY backend/ .
   # ---- Frontend ----
   FROM node:20-alpine AS frontend
   WORKDIR /app/frontend
   COPY package*.json ./
   RUN npm ci --omit=dev
   COPY . .
   RUN npm run build   # creates dist folder
   # ---- Final image ----
   FROM node:20-alpine
   WORKDIR /app
   # copy backend runtime files
   COPY --from=backend /app/backend .
   # copy built frontend as static files
   COPY --from=frontend /app/frontend/dist ./public
   ENV NODE_ENV=production
   EXPOSE 5000
   CMD ["node", "server.js"]
   ```
2. Build & push to a container registry (Docker Hub, GitHub Packages).
3. Deploy the image on a service like Fly.io, Railway, or Render (Docker service).

## 6. Clean‑up & Security
- Rotate `JWT_SECRET` periodically.
- Enable IP‑allowlist or firewall rules for the MongoDB Atlas cluster.
- Use HTTPS (both Vercel and Render provide it automatically).
- Set `CORS` in `backend/api/index.js` to allow only your frontend domain.

---
**That’s it!** Follow the steps above and your Basudev Construction site will be live.
