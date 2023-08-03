import connectToDB from "./config/database.config";
import app from "./config/app.config";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

connectToDB()
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port: ${port}`))
  )
  .catch((err) => console.error(err));
