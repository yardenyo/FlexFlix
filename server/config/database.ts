import mongoose, { ConnectOptions } from "mongoose";

// Load env variables
require("dotenv").config();

//Variables
const uri = process.env.ATLAS_URI || "";

// Connect to MongoDB Atlas
async function connectToDB() {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log("Connected to MongoDB Atlas");
      });
  } catch (err) {
    throw err;
  }
}

export default connectToDB;
