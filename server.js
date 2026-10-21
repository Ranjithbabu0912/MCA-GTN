require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config/db");
const { seedInitialData } = require("./utils/seedData");

const authRoutes = require("./routes/authRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

// Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Auto-connect to MongoDB for serverless environments (Vercel)
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api") && mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (e) {
      console.error("[MongoDB] Serverless connection error:", e);
    }
  }
  next();
});

// Placeholder fallback handler (prevents 404 on placeholder image requests)
app.get("/assets/images/placeholder.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/images/placeholder.jpg"));
});

// Static files (serves website pages, styles, scripts, assets)
app.use(express.static(path.join(__dirname)));
app.use(
  "/assets/uploads",
  express.static(path.join(__dirname, "assets/uploads")),
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/upload", uploadRoutes);

// System Health & Diagnostics endpoint
app.get("/api/health", (req, res) => {
  const { isMongo } = require("./config/db");
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    database: isMongo() ? "MongoDB Atlas" : "Connecting",
    service: "G.T.N. Arts College — MCA MERN Backend & Admin API",
  });
});

// Admin Route alias
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// Catch-all 404 Handler
app.use((req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
  } else {
    res.status(404).json({ success: false, message: "Endpoint not found" });
  }
});

// Start Server
async function startServer() {
  await connectDB();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(
      `================================================================`,
    );
    console.log(` G.T.N. ARTS COLLEGE (AUTONOMOUS) — DEPARTMENT OF MCA`);
    console.log(` MERN STACK SERVER & ADMIN MODULE`);
    console.log(
      `================================================================`,
    );
    console.log(` Web Server:    http://localhost:${PORT}`);
    console.log(` Admin Portal:  http://localhost:${PORT}/admin.html`);
    console.log(` API Endpoint:  http://localhost:${PORT}/api/health`);
    console.log(` Admin Auth:    Configured via .env (ADMIN_PIN & ADMIN_PASSWORD)`);
    console.log(
      `================================================================`,
    );
  });
}

if (require.main === module) {
  startServer().catch((err) => {
    console.error("Fatal Server Boot Error:", err);
  });
}

module.exports = app;
