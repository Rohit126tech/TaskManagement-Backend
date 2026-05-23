
const Task = require('../models/Task');



// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {

    const query = {};

    let tasks;

    // Admin can access all users tasks
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    tasks = await Task.find(query)
      .populate('user', 'name email role');

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// GET SINGLE TASK
exports.getTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id)
      .populate('user', 'name email role');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Ownership check
    if (
      task.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    // Attach logged-in user
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Ownership check
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('user', 'name email role');

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Ownership check
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
 
  
};

  //update status
 
exports.updateTaskStatus = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Ownership check
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    task.status = req.body.status;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: task
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};





