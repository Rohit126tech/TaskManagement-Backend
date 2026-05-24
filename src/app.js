const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [

  "https://task-management-fontend-7esllcssj-rohit-deokar-s-projects.vercel.app/",
  
  "http://localhost:4200"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
