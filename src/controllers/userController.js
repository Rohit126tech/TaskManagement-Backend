//all users

const User = require("../models/User");

exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
 
//user specific tasks

const Task = require("../models/Task");

exports.getUserTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.params.userId
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


