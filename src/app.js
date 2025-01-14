const express = require("express");

const { connectDB } = require("./config/database.js");

const User = require("./modals/user.js");

const bcrypt = require("bcryptjs");

const app = express();

const { validateSignUpData } = require("./utils/validate.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error for signing up the data- " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login succesfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("User credentials not correct: " + err);
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body?.emailId;
  console.log(emailId, "emailId");

  const user = await User.find({ emailId: emailId });

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

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Deleted successfully" + user);
  } catch (err) {
    res.status(400).send("Error for saving data " + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
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

connectDB()
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(3000, () => {
      console.log("server running at port 3000");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected " + err);
  });
