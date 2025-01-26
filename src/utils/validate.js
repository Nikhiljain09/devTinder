const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["age", "gender", "photoUrl", "about", "skills"];

  const isEditProfileDataValid = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditProfileDataValid;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
