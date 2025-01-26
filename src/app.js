const express = require("express");

const { connectDB } = require("./config/database.js");

const User = require("./modals/user.js");

const cookieParser = require("cookie-parser");

const { userAuth } = require("./Middlewares/auth.js");

const app = express();

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user.js");
const requestsRouter = require("./routes/requests.js");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", requestsRouter);

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
