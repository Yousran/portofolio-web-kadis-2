# Build Stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.ts ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src

# Install production dependencies
RUN npm install --only=production
RUN npx prisma generate

# Final setup
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "tsx", "server.ts"]
