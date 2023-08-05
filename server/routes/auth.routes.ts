import express from "express";
import AuthController from "../controllers/auth.controller";
import successResponseMiddleware from "../middlewares/successResponse.middleware";

const router = express.Router();

// Login
router.post("/login", AuthController.login);

// Logout
router.post("/logout", AuthController.logout);

router.use(successResponseMiddleware);

export default router;
