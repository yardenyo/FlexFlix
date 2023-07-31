import express from "express";
import RoleController from "../controllers/roles.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";

const router = express.Router();

// Create a new role
router.post("/", authMiddleware, authAdminMiddleware, RoleController.create);

// Get all roles
router.get("/", authMiddleware, RoleController.getAll);

// Get a single role by ID
router.get("/:id", authMiddleware, RoleController.getById);

// Update a role
router.put("/:id", authMiddleware, authAdminMiddleware, RoleController.update);

// Delete a role
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  RoleController.delete
);

// Delete all roles
router.delete(
  "/",
  authMiddleware,
  authAdminMiddleware,
  RoleController.deleteAll
);

export default router;
