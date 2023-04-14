import express from "express";
import UserController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

// Create a new user
router.post("/", UserController.create);

// Get all users
router.get("/", authMiddleware, UserController.getAll);

// Get a single user by ID
router.get("/:id", authMiddleware, UserController.getById);

// Update a user
router.put("/:id", authMiddleware, UserController.update);

// Delete a user
router.delete("/:id", authMiddleware, UserController.delete);

export default router;
