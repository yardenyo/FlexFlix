import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import passportConfig from "../config/passport.config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Routes
import appRoutes from "../routes/app.routes";
import userRoutes from "../routes/users.routes";
import authRoutes from "../routes/auth.routes";
import roleRoutes from "../routes/roles.routes";
import permissionRoutes from "../routes/permissions.routes";

// Middlewares
import successResponseMiddleware from "../middlewares/successResponse.middleware";
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passportConfig(passport);

app.use(
  session({
    secret: process.env.AUTH_SECRET ?? "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/app", appRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/roles", roleRoutes);
app.use("/permissions", permissionRoutes);

app.use(successResponseMiddleware);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.resolve(__dirname, "../../../", "client", "dist"))
  );
  app.get("*", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../../", "client", "dist", "index.html")
    );
  });
}

export default app;
