
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const User = require("../models/User");

const createAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
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

