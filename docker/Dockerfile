# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]