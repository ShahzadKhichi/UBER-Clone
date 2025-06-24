const User = require("../Models/user.model");
const userService = require("../Services/user.services");
const BlackListToken = require("../Models/blackLIstToken.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await User.hashPassword(password);
    const user = await userService.createUser({
      ...fullname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({ error: "invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "invalid email or password" });

    const token = user.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const blacklistedToken = await BlackListToken.create({ token });
    if (!blacklistedToken) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    await res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    return res.status(200).json({
      user: {
        id: req.user._id,
        fullname: req.user.fullname,
        email: req.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
