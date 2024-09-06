const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validateInput");
const apiController = require("../controllers/apiController");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/", limits: 5000 });

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

// need to create specific route for uploading pictures only
// there might be a way to upload image and picture in the same route, but I cant figure it out

// post new picture
router.post(
  "/statuspic",
  passport.authenticate("jwt", { session: false }),
  upload.single("picture"),
  apiController.postNewPic
);

// post new status
router.post(
  "/status",
  passport.authenticate("jwt", { session: false }),
  apiController.postStatus
);

module.exports = router;
