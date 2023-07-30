import express from "express";
import AppController from "../controllers/app.controller";

const router = express.Router();

router.get("/config", AppController.fetchAppConfig);

router.get("/fetchGeneralSettings", AppController.fetchGeneralSettings);

export default router;
