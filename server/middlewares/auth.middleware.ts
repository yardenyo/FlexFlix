import jwt from "jsonwebtoken";

function authMiddleware(req: any, res: any, next: any): void {
  const token: string | undefined = req.cookies.access_token;
  if (token) {
    jwt.verify(
      token,
      process.env.AUTH_SECRET || "my-secret",
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          req.user = decoded;
          next();
        }
      }
    );
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default authMiddleware;
