const asyncHandler = require("express-async-handler");
const { body, query, validationResult } = require("express-validator");
const { genPassword } = require("../lib/passportUtils");
const { postNewUser } = require("../services/postNewUser");
const { postPicture } = require("../services/postPicture");
const { postStatus } = require("../services/postStatus");
const { getStatuses } = require("../services/getStatuses");
const jwt = require("jsonwebtoken");

exports.postUser = asyncHandler(async (req, res, next) => {
  // input already validated by middleware
  // generate hash
  const hash = await genPassword(req.body.password);
  // call service to create a new user
  const response = await postNewUser(req.body.username, req.body.email, hash);

  console.log(response);
  return res.json(response);
});

// login
exports.postLogin = asyncHandler(async (req, res, next) => {
  console.log("post login function entered");
  const token = jwt.sign({ email: req.user.email }, "secret", {
    expiresIn: "12h",
  });
  return res.json({ token: token });
});

// check login status
exports.getLoginStatus = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  return res.json(req.user);
});

// post a new picture
exports.postNewPic = asyncHandler(async (req, res, next) => {
  console.log(req.file.path);

  // call service to upload picture to cloudinary
  const response = await postPicture(req.file.path);

  console.log(response);
  return res.json(response);
});

// create a new post
exports.postStatus = [
  body("text").isLength({ max: 1000 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Validation error" });
    }

    console.log("POST STATUS CONTROLLER");
    console.log(req.user);
    console.log(req.body);

    // call service to create a new post!
    const response = await postStatus(
      req.body.text,
      req.body.imageUrl,
      req.user
    );
    console.log(response);
    return res.json(response);
  }),
];

// get status
exports.getStatus = asyncHandler(async (req, res, next) => {
  console.log(req.user);

  // call service to return status info
  const response = await getStatuses(req.user.id);
  console.log(response);

  return res.json(response);
});
