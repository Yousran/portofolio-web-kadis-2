<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/401d1d6e-8dda-455b-a308-256006e9072c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Migrate prisma
`npx prisma migrate` (try this if npm run dev doesn't work)
4. Run the app:
   `npm run dev`

## Docker Setup (Recommended)

**Prerequisites:** Docker Desktop (or Docker Engine + Compose)

1. Build and start services:
   `docker compose up -d --build`
2. Open the app:
   `http://localhost:3000`
3. Follow logs (optional):
   `docker compose logs -f app`
   `docker compose logs -f db`

### Reset database (optional)

If you want to re-import the SQL dump from scratch:

1. Stop and remove containers + volumes:
   `docker compose down -v`
2. Rebuild and start:
   `docker compose up -d --build`

## Notes on Changes Made

- Docker Compose now mounts the SQL dump from `./prisma/migrations/...` and uses `3000:3000` for the app port.
- Docker Compose now mounts `./uploads` into the container so `/uploads` assets are served.
- Dockerfile installs OpenSSL in the production image so Prisma can load the query engine.
- Server now reads `PORT` from environment (defaults to 3000).
- Prisma schema maps models to existing lowercase table names from the dump.

## Commands Used (Session Log)

These are the main commands executed during setup and troubleshooting:

- `docker compose up -d --build`
- `docker compose logs -f db`
- `docker compose logs -f app`
- `docker compose down -v`
- `docker compose down`
- `docker compose ps`
- `docker compose exec db mysql -u admin -padmin_password -e "SHOW DATABASES;"`
- `docker compose exec db mysql -u admin -padmin_password -e "SHOW TABLES FROM portfolio;"`
- `Get-Content .\prisma\migrations\20260507085813_init\dump-db_kadis_2-202605072120.sql | mysql -u USER -p db_kadis_2`
- `Invoke-WebRequest http://localhost/ -UseBasicParsing`
- `netstat -ano | findstr :80`
- `netstat -ano | findstr :3000`

