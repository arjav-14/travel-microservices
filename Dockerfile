# ===============================================
# Development Stage
# ===============================================
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]

# ===============================================
# Production Stage
# ===============================================
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm and production dependencies only
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --production

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy environment variables (if any)
COPY .env.production .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/main.js"]
