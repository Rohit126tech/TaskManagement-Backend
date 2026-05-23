
const express = require("express");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(protect);

// GET + CREATE
router.route("/")
  .get(getTasks)
  .post(createTask);

// GET ONE + UPDATE + DELETE
router.route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

// UPDATE STATUS
router.patch("/:id/status", updateTaskStatus);

module.exports = router;

