FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start the Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080"]