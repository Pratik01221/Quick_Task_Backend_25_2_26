require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/Bookings");
const providerRoutes = require("./routes/Providers");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

/* ===== Middleware ===== */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://quick-task-frontend-25-2-26.vercel.app", // ❌ removed trailing slash
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* ===== Database ===== */
ConnectDB();

/* ===== Routes ===== */
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/providers", providerRoutes);
app.use("/payments", paymentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ===== Error Handler ===== */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

 

module.exports = app;