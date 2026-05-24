
const express = require("express");

const {
  getAllUsers,
  getUserTasks,
 
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId/tasks", getUserTasks);



module.exports = router;

