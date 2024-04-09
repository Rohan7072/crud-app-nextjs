# Use the official Node.js image as base
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build





# Start Nginx when the container starts
CMD ["npm", "start"]
