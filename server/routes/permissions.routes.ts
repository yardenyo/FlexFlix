import express from "express";
import PermissionController from "../controllers/permissions.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";

const router = express.Router();

// Create a new permission
router.post(
  "/createPermission",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.create
);

// Get all permissions
router.get("/getPermissions", authMiddleware, PermissionController.getAll);

// Get a single permission by ID
router.get("/getPermission", authMiddleware, PermissionController.getById);

// Assign a permission/s to a role
router.post(
  "/assignPermissions",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.assign
);

// Update a permission
router.post(
  "/updatePermission",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.update
);

// Delete a permission
router.post(
  "/deletePermission",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.delete
);

// Delete all permissions
router.post(
  "/deleteAllPermissions",
  authMiddleware,
  authAdminMiddleware,
  PermissionController.deleteAll
);

export default router;
