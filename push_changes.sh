#!/bin/bash

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "fix: adjust prompt to skip consultation structure for simple article requests"

# Push to the remote repository (assuming main branch)
git push origin main
