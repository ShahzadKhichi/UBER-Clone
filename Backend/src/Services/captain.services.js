const Captain = require("../Models/captain.model");

module.exports.createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  const alreadyExsist = await Captain.find({ email });
  if (alreadyExsist.length > 0) {
    throw new Error("Capatain already exists");
  }

  const cap = await Captain.create({
    fullname,
    email,
    password,
    vehicle,
  });
  return cap;
};
