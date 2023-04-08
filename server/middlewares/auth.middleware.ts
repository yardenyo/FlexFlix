import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies["jwt-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
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
  }
};

export default authMiddleware;
