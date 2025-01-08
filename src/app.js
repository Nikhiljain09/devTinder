const express = require("express");

const { connectDB } = require("./config/database.js");

const User = require("./modals/user.js");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Nikhil",
    lastName: "Jain",
    emailId: "nikhil@jain1.com",
    password: "nikhil@123",
  });

  try {
    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error for saving data " + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(3000, () => {
      console.log("server running at port 3000");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected ");
  });
