#!/bin/bash

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "feat(legal): implement Law 49-16 for commercial leases and deprecate Code Commerce Art 114"

# Push to the remote repository (assuming main branch)
git push origin main
