#!/bin/bash
set -e

# ==============================================================================
# LinguaSUpra — Automated Vercel Deployment Script
# ==============================================================================
# Pushes changes directly to GitHub (branch 'main'), which automatically
# triggers an instant deployment on Vercel.
# ==============================================================================

COMMIT_MSG="${1:-Update website content and deploy to Vercel ($(date '+%Y-%m-%d %H:%M:%S'))}"

echo "=========================================="
echo " LinguaSUpra — Vercel Deploy"
echo "=========================================="

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
  echo "ℹ️  No changes detected in working tree. Working tree is clean."
  echo "Checking if local branch is ahead of origin/main..."
  AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
  if [ "$AHEAD" -gt 0 ]; then
    echo "Local branch has $AHEAD unpushed commit(s). Pushing to origin/main..."
    git push origin main
    echo "🚀 Deployment successfully triggered on Vercel!"
  else
    echo "✅ Everything is up to date on origin/main. Nothing to deploy."
  fi
  exit 0
fi

echo "📦 Staging all modifications..."
git add -A

echo "📝 Committing changes: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "=========================================================="
echo "✅ Changes pushed to GitHub (origin/main)!"
echo "🔄 Vercel automatic deployment has been initiated."
echo "🌐 Check your Vercel Dashboard for real-time build status."
echo "=========================================================="
