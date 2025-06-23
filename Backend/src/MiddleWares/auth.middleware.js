const User = require("../Models/user.model");
const Captain = require("../Models/captain.model");
const jwt = require("jsonwebtoken");
const BlackListToken = require("../Models/blackLIstToken.model");
const dotenv = require("dotenv");
dotenv.config({});

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
