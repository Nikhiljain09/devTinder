const { userAuth } = require("../Middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validate.js");

const express = require("express");

const profileRouter = express.Router();

profileRouter.use(express.json());
//profileRouter.use(cookieParser());

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // const cookies = req.cookies;
  // const {token} = cookies;
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }

  // console.log(cookies);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    } else {
      const loggedUser = req.user;

      Object.keys(req.body).map((key) => (loggedUser[key] = req.body[key]));
      console.log(loggedUser);

      await loggedUser.save();
      res.send({
        message: `${loggedUser.firstName}, Your Profile is edited`,
        data: loggedUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Edit not allowed" + err);
  }
});

module.exports = profileRouter;
