import { Request, Response } from "express";
import helpers from "../helpers/app.helpers";
import { T_AppConfig, T_AppGeneralSettings } from "./../types/app.types";

const AppController = {
  fetchAppConfig: function (req: Request, res: Response): void {
    try {
      const appConfig: T_AppConfig = {
        timezone: helpers.getUserTimeZone(),
        timezone_datetime: helpers.getUserDateTime(),
        theme: "dark",
        routes: ["dashboard", "users", "roles", "permissions"],
        authenticated: req.loggedIn || false,
      };
      res.status(200).json({ status: true, data: appConfig });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  fetchGeneralSettings: function (_req: Request, res: Response): void {
    try {
      const appGeneralSettings: T_AppGeneralSettings = {
        try123: "try123",
      };
      res.status(200).json({ status: true, data: appGeneralSettings });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  },
};

export default AppController;
