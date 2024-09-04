const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validateInput");
const apiController = require("../controllers/apiController");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.send("test");
});

// first validate user input data is OK via middleware
router.post("/user", registerValidation, apiController.postUser);

router.post(
  "/login",
  loginValidation,
  passport.authenticate("local", { session: "false" }),
  apiController.postLogin
);

module.exports = router;
