const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load env variables
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Variables
const uri = process.env.ATLAS_URI;
const port = process.env.SERVER_PORT || 5000;

// Connect to MongoDB Atlas
async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.log(err);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectToDB().then(() => {
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
});
