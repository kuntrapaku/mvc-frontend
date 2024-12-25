const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  ],
  register
);

router.post("/login", login);

module.exports = router;
