const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../Controllers/user.controller");
const { authUser } = require("../MiddleWares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 8 }).withMessage("too shor password"),
  ],
  userController.loginUser
);

router.get("/profile", authUser, userController.getUserProfile);

router.get("/logout", authUser, userController.logoutUser);
module.exports = router;
