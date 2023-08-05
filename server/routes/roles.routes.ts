import express from "express";
import RoleController from "../controllers/roles.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authAdminMiddleware from "../middlewares/authAdmin.middleware";
import successResponseMiddleware from "../middlewares/successResponse.middleware";

const router = express.Router();

// Create a new role
router.post(
  "/createRole",
  authMiddleware,
  authAdminMiddleware,
  RoleController.create
);

// Get all roles
router.get("/getRoles", authMiddleware, RoleController.getAll);

// Get a single role by ID
router.get("/getRole", authMiddleware, RoleController.getById);

// Update a role
router.post(
  "/updateRole",
  authMiddleware,
  authAdminMiddleware,
  RoleController.update
);

// Delete a role
router.post(
  "/deleteRole",
  authMiddleware,
  authAdminMiddleware,
  RoleController.delete
);

// Delete all roles
router.post(
  "/deleteAllRoles",
  authMiddleware,
  authAdminMiddleware,
  RoleController.deleteAll
);

router.use(successResponseMiddleware);

export default router;
