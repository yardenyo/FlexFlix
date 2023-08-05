import express from "express";
import AppController from "../controllers/app.controller";
import loggedInMiddleware from "../middlewares/loggedIn.middleware";
import successResponseMiddleware from "../middlewares/successResponse.middleware";

const router = express.Router();

router.get("/config", loggedInMiddleware, AppController.fetchAppConfig);

router.get("/fetchGeneralSettings", AppController.fetchGeneralSettings);

router.use(successResponseMiddleware);

export default router;
