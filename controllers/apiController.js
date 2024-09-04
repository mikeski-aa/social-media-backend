const asyncHandler = require("express-async-handler");
const { body, query } = require("express-validator");
const { genPassword } = require("../lib/passportUtils");
const { postNewUser } = require("../services/postNewUser");
const { ExpressValidator } = require("express-validator");

exports.postUser = asyncHandler(async (req, res, next) => {
  // input already validated by middleware
  // generate hash
  const hash = await genPassword(req.body.password);
  // call service to create a new user
  const response = await postNewUser(req.body.username, req.body.email, hash);

  console.log(response);
  return res.json(response);
});
