const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validateInput");
const apiController = require("../controllers/apiController");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", function (req, res, next) {
  res.send("test");
});

// first validate user input data is OK via middleware
router.post("/user", registerValidation, apiController.postUser);

// LOGIN with validation middleware for input
router.post(
  "/login",
  loginValidation,
  passport.authenticate("local", { session: false }),
  apiController.postLogin
);

// check login status
router.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  apiController.getLoginStatus
);

// post new status
router.post("/status", function (req, res) {
  console.log("test");
});

module.exports = router;
