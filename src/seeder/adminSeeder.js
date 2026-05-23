
const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/task-management");

    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin created successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

createAdmin();

