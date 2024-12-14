# Development stage for Frontend and Backend
FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY server/package*.json ./
RUN npm install

COPY server/src/ ./src/
COPY server/tsconfig.json ./

# Build backend
RUN npm run build

# Setup frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./
COPY tailwind.config.js ./

# Copy environment variables if needed
COPY server/.env /app/

# Expose ports for both frontend and backend
EXPOSE 3000 5000

# Copy start script
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Set working directory back to root
WORKDIR /app

# Start both frontend and backend services using a shell script
CMD ["./start.sh"]
