# Build Stage
FROM node:20-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.ts ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src

RUN npm install --only=production
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3001

# Jalankan migrate dulu, baru start server
CMD ["npx", "tsx", "server.ts"]
