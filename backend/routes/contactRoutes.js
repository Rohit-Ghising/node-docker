const express = require("express");
const mongoose = require("mongoose");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();
const localMessages = [];

router.get("/", (_req, res) => {
  res.json({
    message: "Send a POST request to submit the contact form."
  });
});

router.post("/", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please fill out name, email, and message."
    });
  }

  if (mongoose.connection.readyState === 1) {
    try {
      await ContactMessage.create({ name, email, message });
      return res.status(201).json({
        message: "Thanks. Your message was sent and saved in MongoDB."
      });
    } catch (error) {
      console.warn(`MongoDB save failed, using local demo storage: ${error.message}`);
    }
  }

  localMessages.unshift({
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({
    message: "Thanks. Your message was received in demo mode."
  });
});

module.exports = router;
