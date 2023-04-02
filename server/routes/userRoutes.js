const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Create a new user
router.post("/", UserController.create);

// Get all users
router.get("/", UserController.getAll);

// Get a single user by ID
router.get("/:id", UserController.getById);

// Update a user
router.put("/:id", UserController.update);

// Delete a user
router.delete("/:id", UserController.delete);

module.exports = router;
