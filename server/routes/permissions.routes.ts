import express from "express";
import PermissionController from "../controllers/permissions.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";

const router = express.Router();

// Create a new permission
router.post(
  "/",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.create
);

// Get all permissions
router.get("/", authMiddleware, PermissionController.getAll);

// Get a single permission by ID
router.get("/:id", authMiddleware, PermissionController.getById);

// Assign a permission/s to a role
router.post(
  "/:id/assign",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.assign
);

// Update a permission
router.put(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.update
);

// Delete a permission
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.delete
);

// Delete all permissions
router.delete(
  "/",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.deleteAll
);

export default router;
