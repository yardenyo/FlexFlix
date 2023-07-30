import express from "express";
import UserController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";

const router = express.Router();

// Create a new user
router.post("/", UserController.create);

// Get all users
router.get("/", authMiddleware, UserController.getAll);

// Get a single user by ID
router.get("/:id", authMiddleware, UserController.getById);

// Update a user
router.put("/:id", authMiddleware, authAdminMiddleware, UserController.update);

// Delete a user
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  UserController.delete
);

// Delete all users
router.delete(
  "/",
  authMiddleware,
  authAdminMiddleware,
  UserController.deleteAll
);

export default router;
