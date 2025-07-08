# Use official Node.js 22 image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy application code
COPY . .

# Start the server
CMD ["node", "server.js"]