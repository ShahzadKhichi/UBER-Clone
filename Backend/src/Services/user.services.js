const User = require("../Models/user.model");
module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const existingUser = await User.findOne({ email });

  console.log(password);

  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = await User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};
