import express from "express";
import UserController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";

const router = express.Router();

// Create a new user
router.post("/createUser", UserController.create);

// Get all users
router.get("/getUsers", authMiddleware, UserController.getAll);

// Get a single user by ID
router.get("/getUser", authMiddleware, UserController.getById);

// Update a user
router.post(
  "/updateUser",
  authMiddleware,
  authAdminMiddleware,
  UserController.update
);

// Delete a user
router.post(
  "/deleteUser",
  authMiddleware,
  authAdminMiddleware,
  UserController.delete
);

// Delete all users
router.post(
  "/deleteAllUsers",
  authMiddleware,
  authAdminMiddleware,
  UserController.deleteAll
);

export default router;
