const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://task-management-fontend-jdpuj5a0t-rohit-deokar-s-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

module.exports = app;