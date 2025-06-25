const router = require("express").Router();
const { body } = require("express-validator");
const captainController = require("../Controllers/captain.controller");
const { authCaptain } = require("../MiddleWares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("vehicle.color").notEmpty().withMessage("vehicle color is required"),
    body("vehicle.plateNumber")
      .notEmpty()
      .withMessage("vehicle plate number is required"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("vehicle capacity must be a number"),
    body("vehicle.type")
      .isIn(["car", "bike", "auto"])
      .withMessage("vehicle type must be one of car, bike, or auto"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 8 }).withMessage("too short password"),
  ],
  captainController.loginCaptain
);

router.get("/profile", authCaptain, captainController.getCaptainProfile);

router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
