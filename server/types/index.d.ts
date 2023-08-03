export {};
import HttpException from "./../exceptions/HttpException";

declare global {
  namespace Express {
    interface Request {
      loggedIn?: boolean;
    }
    interface Response {
      HttpException: typeof HttpException;
    }
  }
}
