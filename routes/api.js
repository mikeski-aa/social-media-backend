var express = require("express");
const { registerValidation } = require("../middleware/validateInput");
const apiController = require("../controllers/apiController");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("test");
});

// first validate user input data is OK via middleware
router.post("/user", registerValidation, apiController.postUser);

module.exports = router;
