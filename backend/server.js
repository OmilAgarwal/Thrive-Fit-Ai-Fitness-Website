const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

// MongoDB Connection
// mongodb://localhost:27017/
mongoose
  .connect("mongodb+srv://omilagarwal:xdb6iRHUorCSs48Y@cluster0.jm2yzti.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", authRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
