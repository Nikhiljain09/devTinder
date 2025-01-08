const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";

  if (isAdminAuthorised) {
    //res.send("Admin is authorised");
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isUserAuthorised = token === "xyz";

  if (isUserAuthorised) {
    //res.send("User is authorised");
    next();
  } else {
    res.send("User is UnAuthorised");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
