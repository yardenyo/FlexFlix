const User = require("../models/userModel");

const UserController = {};

// Create a new user
UserController.create = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    await user.save();
    res
      .status(200)
      .json({ status: "success", data: user, message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
UserController.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ status: "success", data: users, message: "All users" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
UserController.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(200)
        .json({ status: "failed", message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "success", data: user, message: "User found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
UserController.update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(200)
        .json({ status: "failed", message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    await user.save();
    res
      .status(200)
      .json({ status: "success", data: user, message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
UserController.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(200)
        .json({ status: "failed", message: "User not found" });
    }
    res
      .status(200)
      .json({ status: "success", data: user, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = UserController;
