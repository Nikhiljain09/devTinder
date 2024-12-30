const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server !");
});

app.get("/hello", (req, res) => {
  res.send("hello node.js");
  //console.log("hello node.js");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
