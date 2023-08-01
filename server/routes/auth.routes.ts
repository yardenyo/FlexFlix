import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

// Login
router.post("/login", AuthController.login);

// Logout
router.post("/logout", AuthController.logout);

export default router;
