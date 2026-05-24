const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://task-management-fontend-4nzj.vercel.app",
      "https://task-management-fontend-4nzj-o5xh8pf3k-rohit-deokar-s-projects.vercel.app",
      "https://task-management-fontend-4nzj-b75i8yk10-rohit-deokar-s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

module.exports = app;
