const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const allowedOrigins = [
  "https://task-management-fontend-7esllcssj-rohit-deokar-s-projects.vercel.app",
  "http://localhost:4200"
];

// CORS FIXED
app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

//  handle preflight requests
app.options("*", cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

module.exports = app;
