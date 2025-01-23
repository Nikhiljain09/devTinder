const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedToken = await jwt.verify(token, "SecretKey@dev45789");

    const { _id } = decodedToken;

    const user = await User.findById(_id);
    if (!user) {
      //res.send("User is authorised");
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("User is not authorised " + err);
  }
};

module.exports = {
  userAuth,
};
