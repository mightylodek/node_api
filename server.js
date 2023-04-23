const express = require("express");
const app = express();

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog, how you doing");
});

app.listen(3000, () => {
  console.log("Node API app is running on port 3000 ");
});
