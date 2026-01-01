# Hosting Guide for Basudev Construction

Your application consists of two parts:
1. **Frontend**: The React website (what users see).
2. **Backend**: The Node.js server (handles emails, database, login).

You need to host them separately. This guide uses **Vercel** for the frontend and **Render** for the backend (both have free tiers).

---

## Step 1: Push Your Code to GitHub (Prerequisite)

1. Create a GitHub repository (e.g., `basudev-construction`).
2. Push your entire project code to this repository.

---

## Step 2: Host Backend on Render

1. Go to [Render.com](https://render.com/) and create an account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Select the repository `basudev-construction`.
5. Configure the service:
   - **Name**: `basudev-backend` (or similar)
   - **Root Directory**: `backend` (IMPORTANT)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
6. scroll down to **Environment Variables** and add:
   - `MONGODB_URI`: Your MongoDB Connection String (from Atlas)
   - `EMAIL_USER`: `kyabhishek0@gmail.com`
   - `EMAIL_PASS`: `iohrkqntxnsekpjf`
   - `JWT_SECRET`: (Enter a random secret key here)
7. Click **Create Web Service**.
8. Wait for it to deploy. Render will give you a URL like `https://basudev-backend.onrender.com`. **Copy this URL.**

---

## Step 3: Host Frontend on Vercel

1. Go to [Vercel.com](https://vercel.com/) and create an account.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository `basudev-construction`.
4. Configure the project:
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (leave default)
   - **Output Directory**: `dist` (leave default)
5. Expand **Environment Variables** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: The URL you got from Render (e.g., `https://basudev-backend.onrender.com`) - **IMPORTANT**: Do NOT include a trailing slash `/`.
6. Click **Deploy**.

---

## Step 4: Final Verification

1. Once Vercel finishes, click the link to your live site.
2. Go to the "Vehicles" page to check images.
3. Try "Admin Login" to test backend connection.
4. Try assigning an order on the "Order" page.

**Troubleshooting:**
- If login fails, check the browser console (F12) for CORS errors.
- Ensure `VITE_API_URL` in Vercel matches your Render backend URL exactly.
