import { Request, Response } from "express";
import helpers from "../helpers/app.helpers";

const AppController = {
  fetchAppConfig: async (req: Request, res: Response) => {
    try {
      const appConfig = {
        timezone: helpers.getUserTimeZone(),
        timezone_datetime: helpers.getUserDateTime(),
        theme: "dark",
      };
      res.status(200).json({ status: true, data: appConfig });
    } catch (err: any) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

export default AppController;
