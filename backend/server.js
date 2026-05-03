require("dotenv").config({ path: `${__dirname}/.env` });

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "offline"
  });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

async function startServer() {
  await connectDB();

  app.listen(PORT,"0.0.0.0", () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
