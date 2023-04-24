const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://apiappuser:ga887fQeFZ3F4z@node-api.ii8gnyv.mongodb.net/node-api?retryWrites=true&w=majority";
const Player = require("./models/playerModel.js");

app.use(express.json());

//connect to the database
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog, how you doing");
});

app.post("/player", async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Node API app is running on port 3000 ");
});
