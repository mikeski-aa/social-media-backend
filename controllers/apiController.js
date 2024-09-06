const asyncHandler = require("express-async-handler");
const { body, query } = require("express-validator");
const { genPassword } = require("../lib/passportUtils");
const { postNewUser } = require("../services/postNewUser");
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

// create a new post
exports.postStatus = asyncHandler(async (req, res, next) => {
  console.log("POST STATUS CONTROLLER");
  console.log(req.user);
  console.log(req.body);
  console.log(req.file.path);

  return res.json({ text: "XD" });
});
