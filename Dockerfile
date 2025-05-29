# Use lightweight Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy all other project files
COPY . .

# Build the app
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port serve uses
EXPOSE 5173

# Serve the built app from dist folder
CMD ["serve", "-s", "dist", "-l", "8086"]
