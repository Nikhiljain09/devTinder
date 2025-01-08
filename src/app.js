const express = require("express");

const { connectDB } = require("./config/database.js");

const User = require("./modals/user.js");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error for saving data " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const emailid = req.body.emailId;
  console.log(emailid);

  const user = await User.find({});

  console.log(user);

  if (user.length === 0) {
    res.status(400).send("User not found");
  } else {
    res.send(user);
  }
});
app.get("/feed", async (req, res) => {
  const emailid = req.body.emailId;
  console.log(emailid);

  const user = await User.findOne({ emailId: emailid });

  console.log(user);

  // if (user.length === 0) {
  //res.status(400).send("User not found");
  // } else {
  res.send(user);
  // }
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
