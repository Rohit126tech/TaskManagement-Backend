
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const PORT = process.env.FRONTEND_URL || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

