# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight server to serve the production build
FROM node:16-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the production server
CMD ["serve", "-s", "build", "-l", "3000"]