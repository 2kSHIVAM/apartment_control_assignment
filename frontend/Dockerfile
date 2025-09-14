FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Vite app
RUN npm run build

# Serve with vite preview (default port 8081)
EXPOSE 8081
CMD ["npm", "run", "preview", "--", "--port", "8081", "--host"]
