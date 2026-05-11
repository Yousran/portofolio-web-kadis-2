import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { prisma } from "./src/lib/db.ts";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  
  // Serve uploaded files statically
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // API Routes
  
  // Auth
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    // Simple mock auth as requested
    if (username === "admin" && password === "admin123") {
      res.json({ success: true, token: "mock-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // News
  app.get("/api/news", async (req, res) => {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 6, // Limit to 6 items for homepage display
    });
    res.json(news);
  });

  app.post("/api/news", upload.single("image"), async (req, res) => {
    const { title, tag, link, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const item = await prisma.news.create({
      data: { title, tag, link, date, image },
    });
    res.json(item);
  });

  app.delete("/api/news/:id", async (req, res) => {
    await prisma.news.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  });

  // Awards
  app.get("/api/awards", async (req, res) => {
    const awards = await prisma.award.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(awards);
  });

  app.post("/api/awards", upload.single("image"), async (req, res) => {
    const { title, tag, year } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const item = await prisma.award.create({
      data: { title, tag, year, image },
    });
    res.json(item);
  });

  app.delete("/api/awards/:id", async (req, res) => {
    await prisma.award.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  });

  // Experiences
  app.get("/api/experiences", async (req, res) => {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(experiences);
  });

  app.post("/api/experiences", async (req, res) => {
    const { period, role, company, description } = req.body;
    const item = await prisma.experience.create({
      data: { period, role, company, description },
    });
    res.json(item);
  });

  app.delete("/api/experiences/:id", async (req, res) => {
    await prisma.experience.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  });


  // stats
  app.get("/api/stats", async (req, res) => {
    const newsCount = await prisma.news.count();
    const awardsCount = await prisma.award.count();
    console.log("Stats counts server:", { newsCount, awardsCount });
    res.json({ newsCount, awardsCount });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
