
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },

    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'Completed'],
      default: 'Todo'
    },

    dueDate: {
      type: Date,
      required: [true, 'Please add a due date']
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);

