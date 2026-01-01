#!/usr/bin/env bash

# ------------------------------------------------------------
# Deploy Basudev Construction (frontend + backend) to GitHub & CI/CD
# ------------------------------------------------------------
# Prerequisites:
#   - Git installed
#   - GitHub CLI (gh) installed and authenticated
#   - Node.js (v20+)
#   - MongoDB Atlas URI and JWT secret ready
#   - Render CLI (render) installed (optional) or use Render UI
#   - Vercel CLI (vercel) installed (optional) or use Vercel UI
# ------------------------------------------------------------

# 1. Initialise git repo (if not already)
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# 2. Add all files and commit
git add .
git commit -m "Initial commit for Basudev Construction" || true

# 3. Create remote repository on GitHub (replace <YOUR_GITHUB_USERNAME>)
REPO_NAME="Basudev-Construcction_Backend"
GH_USER="<YOUR_GITHUB_USERNAME>"

# Create repo if it does not exist
if ! gh repo view "$GH_USER/$REPO_NAME" > /dev/null 2>&1; then
  echo "Creating GitHub repository $GH_USER/$REPO_NAME..."
  gh repo create "$GH_USER/$REPO_NAME" --public --source=. --remote=origin
else
  echo "Repository already exists. Adding remote origin..."
  git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git" || true
fi

# 4. Push to GitHub
git push -u origin main

# ------------------------------------------------------------
# CI/CD – GitHub Actions (backend + frontend)
# ------------------------------------------------------------
# The workflow file will be placed at .github/workflows/deploy.yml
# It builds the frontend (Vite) and backend (Node) and deploys:
#   • Backend → Render (using Render Deploy Hook)
#   • Frontend → Vercel (using Vercel Deploy Hook)
# ------------------------------------------------------------

echo "Deployment script finished. Remember to:
  • Add your MongoDB URI and JWT_SECRET as repo secrets:
      MONGODB_URI, JWT_SECRET, VITE_API_URL (backend URL after deployment)
  • Set up Render and Vercel deploy hooks and add them as secrets:
      RENDER_DEPLOY_HOOK, VERCEL_DEPLOY_HOOK
  • Enable GitHub Actions in your repository.
"
