const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");
const userRouter = express.Router();

const User = require("../modals/user.js");

userRouter.get("/user", userAuth, async (req, res) => {
  const emailId = req.body?.emailId;
  console.log(emailId, "emailId");

  const user = await User.find({ emailId: emailId });

  if (user.length === 0) {
    res.status(400).send("User not found");
  } else {
    res.send(user);
  }
});

userRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;

  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "password", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Updated user successfully" + user);
  } catch (err) {
    res.status(400).send("Error for saving data " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  const emailid = req.body.emailId;

  const user = await User.findOne({ emailId: emailid });

  res.send(user);
});

userRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Deleted successfully" + user);
  } catch (err) {
    res.status(400).send("Error for saving data " + err.message);
  }
});

module.exports = userRouter;
