<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/401d1d6e-8dda-455b-a308-256006e9072c

## Run Locally

**Prerequisites:**
- Node.js
- Docker Desktop (or Docker Engine + Compose)

### Setup Steps

1. **Start the database service:**
   ```bash
   docker compose up db -d --build
   ```
   This starts only the MySQL database service in the background.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and update the values with your actual configuration (e.g., `GEMINI_API_KEY`, database credentials, etc.).

4. **Migrate and generate Prisma:**
   Run Prisma migrations to sync your database schema:
   ```bash
   npx prisma migrate dev
   ```
   Generate Prisma client (usually done automatically, but you can run it manually):
   ```bash
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000` (or the port configured in vite.config.ts).

### Stopping the database

When you're done developing, stop the database service:
```bash
docker compose down
```

### Reset database (optional)

To reset the database with a fresh SQL dump:
```bash
docker compose down -v
docker compose up -d db
```

