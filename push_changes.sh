#!/bin/bash

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "feat(legal): enforce strict accuracy mode (no guessing, exact sources, structured format)"

# Push to the remote repository (assuming main branch)
git push origin main
