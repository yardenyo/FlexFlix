import express from "express";
import AppController from "../controllers/app.controller";
import loggedInMiddleware from "../middlewares/loggedIn.middleware";

const router = express.Router();

router.get("/config", loggedInMiddleware, AppController.fetchAppConfig);

router.get("/fetchGeneralSettings", AppController.fetchGeneralSettings);

export default router;
