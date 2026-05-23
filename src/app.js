
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const userRoutes = require("./routes/userRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api", userRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Task Management API Running...');
});

module.exports = app;

