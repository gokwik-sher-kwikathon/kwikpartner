#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Create mock-data directory if it doesn't exist
mkdir -p server/mock-data

# Start the application (both frontend and backend)
echo "Starting KwikPartner application..."
npm run start