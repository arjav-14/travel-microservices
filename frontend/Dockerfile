# ---------- Build Stage ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
# This will automatically handle missing lockfile gracefully
RUN if [ -f pnpm-lock.yaml ]; then \
      echo "✅ pnpm-lock.yaml found — installing with frozen lockfile"; \
      pnpm install --frozen-lockfile; \
    else \
      echo "⚠️ No pnpm-lock.yaml found — installing without frozen lockfile"; \
      pnpm install --no-frozen-lockfile; \
    fi

# Copy the rest of the frontend code
COPY . .

# Build the production-ready app

# Build the production-ready app
RUN pnpm run build

# ---------- Production Stage ----------
FROM nginx:alpine

# Remove default nginx config and copy custom one (if exists)
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
