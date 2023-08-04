export {};

declare global {
  namespace Express {
    interface Request {
      loggedIn?: boolean;
      message?: string;
    }
  }
}
