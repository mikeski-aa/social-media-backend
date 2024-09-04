const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("username").isLength({ min: 1, max: 15 }).trim().escape(),
  body("email").isLength({ min: 1 }).isEmail().trim().escape(),
  body("password").isLength({ min: 1 }).trim().escape(),
  body("confirmPassword").isLength({ min: 1 }).trim().escape(),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Input validation failed" });
    }

    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    return next();
  },
];

exports.loginValidation = [
  body("email").isLength({ min: 1 }).isEmail().trim().escape(),
  body("password").isLength({ min: 1 }).trim().escape(),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Input validation failed" });
    }

    return next();
  },
];
