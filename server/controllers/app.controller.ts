import { Request, Response, NextFunction } from "express";
import helpers from "../helpers/app.helpers";
import { T_AppConfig, T_AppGeneralSettings } from "./../types/app.types";
import HttpException from "../responses/HttpException";

const AppController = {
  fetchAppConfig: function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    try {
      const appConfig: T_AppConfig = {
        timezone: helpers.getUserTimeZone(),
        timezone_datetime: helpers.getUserDateTime(),
        theme: "dark",
        routes: ["dashboard", "users", "roles", "permissions"],
        authenticated: req.loggedIn || false,
      };
      req.body = appConfig;
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },

  fetchGeneralSettings: function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    try {
      const appGeneralSettings: T_AppGeneralSettings = {
        try123: "try123",
      };
      req.body = appGeneralSettings;
      return next();
    } catch (err: any) {
      return next(new HttpException(500, "Something went wrong"));
    }
  },
};

export default AppController;
