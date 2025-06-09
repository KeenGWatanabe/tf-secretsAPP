# Use official lightweight Node.js image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install -g nodemon && npm install aws-sdk && npm install  

# Copy the rest of the app (excluding files in .dockerignore)
COPY . .

# Set ENV variables explicitly for ECS compatibility
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

# Expose port
EXPOSE 5000

# Command to start the app
CMD ["node", "app.js"]
