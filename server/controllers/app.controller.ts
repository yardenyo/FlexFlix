import { Request, Response } from "express";
import helpers from "../helpers/app.helpers";
import { IAppConfig, IAppGeneralSettings } from "./../types/app.types";

const AppController = {
  fetchAppConfig: function (req: Request, res: Response): void {
    try {
      const appConfig: IAppConfig = {
        timezone: helpers.getUserTimeZone(),
        timezone_datetime: helpers.getUserDateTime(),
        theme: "dark",
        routes: ["dashboard", "users", "roles", "permissions"],
      };
      res.status(200).json({ status: true, data: appConfig });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  fetchGeneralSettings: function (req: Request, res: Response): void {
    try {
      const appGeneralSettings: IAppGeneralSettings = {
        try123: "try123",
      };
      res.status(200).json({ status: true, data: appGeneralSettings });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  },
};

export default AppController;
