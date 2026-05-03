const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("MONGODB_URI is not set. Running without MongoDB for now.");
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    return false;
  }
}

module.exports = connectDB;
