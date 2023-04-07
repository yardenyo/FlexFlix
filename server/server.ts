import express from "express";
import cors from "cors";
import connectToDB from "./config/database";

// Routes
import userRoutes from "./routes/userRoutes";

// Load env variables
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());

// Variables
const port = process.env.SERVER_PORT || 5000;

// Routes middleware
app.use("/users", userRoutes);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
