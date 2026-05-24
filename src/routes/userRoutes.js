
const express = require("express");

const {
  getAllUsers,
  getUserTasks
} = require("../controllers/userController");

const router = express.Router();

// GET /users
router.get("/", getAllUsers);

// GET /users/:userId/tasks
router.get("/:userId/tasks", getUserTasks);

module.exports = router;

