#!/bin/bash

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "fix(data): correct Article 37 text and add truncated data warning system"

# Push to the remote repository (assuming main branch)
git push origin main
