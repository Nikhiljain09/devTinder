const mongoose = require("mongoose");

// const user = "nikhil200796";
// const Password = "Q0T8hce3eYV6Ntes";

const url =
  "mongodb+srv://nikhil200796:Q0T8hce3eYV6Ntes@namstenodejs.lxf6n.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(url);
};
module.exports = { connectDB };
