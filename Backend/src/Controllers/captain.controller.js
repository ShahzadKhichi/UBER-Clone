const Captain = require("../Models/captain.model");
const captainServices = require("../Services/captain.services");
const BlackListToken = require("../Models/blackLIstToken.model");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await Captain.hashPassword(password);

    const cap = await captainServices.createCaptain({
      fullname,
      email,
      password: hashedPassword,
      vehicle,
    });

    const token = cap.generateAuthToken();

    cap.password = undefined;
    res.cookie("token", token);
    return res.status(201).json({
      captain: {
        fullname,
        email,
        vehicle,
      },
      token,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const cap = await Captain.findOne({ email }).select("+password");

    if (!cap)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await cap.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = cap.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({
      message: "Captain logged in successfully",
      captain: {
        fullname: cap.fullname,
        email: cap.email,
        vehicle: cap.vehicle,
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginCaptain:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    // Here you can add logic to blacklist the token if needed
    await BlackListToken.create({ token });

    res.clearCookie("token");
    return res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    console.error("Error in logoutCaptain:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain;
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }
    return res.status(200).json({
      captain: {
        fullname: captain.fullname,
        email: captain.email,
        vehicle: captain.vehicle,
      },
    });
  } catch (error) {
    console.error("Error in getCaptainProfile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
