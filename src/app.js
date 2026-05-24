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
    origin: ["https://task-management-fontend-kdjbe15a3-rohit-deokar-s-projects.vercel.app/",
      "https://task-management-fontend-7esllcssj-rohit-deokar-s-projects.vercel.app",
      "http://localhost:4200"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

module.exports = app;
