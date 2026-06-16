const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB=require("./config/db")
require("dotenv").config();
const adminRoutes = require("./route/adminroute");
const carRoutes = require("./route/carroute");
const BookingRoutes = require("./route/BookingRoute");
const ContactRoutes = require("./route/contactroute");
const DashboardRoutes = require("./route/DashboardRoute");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/dashboard", DashboardRoutes);

/* ============================ */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});