
const express = require("express");

const {
  getAllUsers,
  getUserTasks,
  deleteUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId/tasks", getUserTasks);

router.delete("/:id", protect, deleteUser);

module.exports = router;

