const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const allowedOrigins = [
  "https://task-management-fontend-7esllcssj-rohit-deokar-s-projects.vercel.app",
  "http://localhost:4200"
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

//  handle preflight explicitly
app.options("*", cors());

// Routes MUST come AFTER cors
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API Running...");
});

module.exports = app;
