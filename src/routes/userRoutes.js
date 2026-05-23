
const express = require("express");

const {
  getAllUsers,
  getUserTasks
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/users/:userId/tasks", getUserTasks);

module.exports = router;
