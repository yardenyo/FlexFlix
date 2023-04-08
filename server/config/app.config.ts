import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import passportConfig from "../config/passport.config";
import authMiddleware from "../middlewares/auth.middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes
import userRoutes from "../routes/users.routes";
import authRoutes from "../routes/auth.routes";

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

app.use("/users", authMiddleware, userRoutes);
app.use("/auth", authRoutes);

export default app;
