const express = require("express");

const app = express();

app.use(
  "/hello",
  (req, res, next) => {
    next();

    res.send("hello node.js");
    console.log("hello node.js");
  },
  (req, res, next) => {
    next();
    res.send("2nd response");
  },

  (req, res) => {
    res.send("3rd response");
  }
);

// app.get("/user/:userid/:name/:password", (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   res.send({ name: "Nikhil", lastName: "Jain" });
// });

app.use("/", (req, res) => {
  res.send("Hello from server !");
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
