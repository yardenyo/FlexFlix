import express from "express";
import AppController from "../controllers/app.controller";

const router = express.Router();

router.get("/config", AppController.fetchAppConfig);

export default router;
