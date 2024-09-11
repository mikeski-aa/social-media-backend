const asyncHandler = require("express-async-handler");
const { body, query, validationResult } = require("express-validator");
const { genPassword } = require("../lib/passportUtils");
const { postNewUser } = require("../services/postNewUser");
const { postPicture } = require("../services/postPicture");
const { postStatus } = require("../services/postStatus");
const { getStatuses } = require("../services/getStatuses");
const { getUserIdArray } = require("../services/getUserIdArray");
const { getPostComments } = require("../services/getPostComments");
const { postNewComment } = require("../services/postNewComment");
const { updateLikesAdd } = require("../services/updateLikesAdd");
const { updateLikesRemove } = require("../services/updateLikesRemove");
const { getLikeArrayForPost } = require("../services/getLikeArrayForPost");
const {
  getLikeArrayForComment,
} = require("../services/getLikeArrayForComment");
const { updateCommentLikesAdd } = require("../services/updateCommentLikesAdd");
const {
  updateCommentLikesRemove,
} = require("../services/updateCommentLikesRemove");
const { getFriends } = require("../services/getFriends");
const { getUsers } = require("../services/getUsers");
const { postRequest } = require("../services/postRequest");
const jwt = require("jsonwebtoken");
const { response } = require("express");

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
  return res.json({ token: token, user: req.user });
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
exports.getStatus = [
  query("count").escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }
    console.log(req.user);
    console.log(req.query.count);

    // call service to return user id array first
    const userIdArray = await getUserIdArray(req.user.id);
    const response = await getStatuses(userIdArray, req.query.count);

    return res.json(response);
  }),
];

// GET COMMENTS
exports.getComments = [
  query("postid").escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    console.log("valid routing detected");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    // call service to return user id array first
    const comments = await getPostComments(req.query.postid);

    return res.json(comments);
  }),
];

// POST a new comment
exports.postComment = [
  body("text").escape().trim().isLength({ min: 1, max: 1000 }),
  body("postid").escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    // call post service
    const response = await postNewComment(
      req.user.id,
      req.body.postid,
      req.body.text
    );
    return res.json(response);
  }),
];

// update post likes
exports.putLike = [
  query("postid").escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    // first check if user is already liking the post
    const likedArray = await getLikeArrayForPost(req.query.postid, req.user.id);

    // check if array contains user ID
    const filterForUser = likedArray.likes.filter(
      (item) => item === req.user.id
    );

    // if length is 0, aka no user found, we add a like
    // otherwise we remove the like to work like a toggle
    if (filterForUser.length === 0) {
      console.log("post not liked yet :");
      const addLike = await updateLikesAdd(req.query.postid, req.user.id);
      console.log("likes: " + addLike.likes);
      return res.json(addLike);
    } else {
      console.log("post already liked!");
      const newArray = likedArray.likes.filter((like) => like != req.user.id);
      console.log(newArray);
      const removeLike = await updateLikesRemove(req.query.postid, newArray);
      console.log("likes: " + removeLike.likes);
      return res.json(removeLike);
    }
  }),
];

// update comment likes
exports.putLikeComment = [
  query("commentid").escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    // first check if user is already liking the post
    const likedArray = await getLikeArrayForComment(
      req.query.commentid,
      req.user.id
    );
    console.log("//////////////////");
    console.log(likedArray);

    // check if array contains user ID
    const filterForUser = likedArray.likes.filter(
      (item) => item === req.user.id
    );

    // if length is 0, aka no user found, we add a like
    // otherwise we remove the like to work like a toggle
    if (filterForUser.length === 0) {
      console.log("post not liked yet :");
      const addLike = await updateCommentLikesAdd(
        req.query.commentid,
        req.user.id
      );
      return res.json(addLike);
    } else {
      console.log("post already liked!");
      const newArray = likedArray.likes.filter((like) => like != req.user.id);
      const removeLike = await updateCommentLikesRemove(
        req.query.commentid,
        newArray
      );
      return res.json(removeLike);
    }
  }),
];

// get friends
exports.getFriends = asyncHandler(async (req, res, next) => {
  const response = await getFriends(req.user.id);

  res.json(response);
});

// get all users searched for -> case insensitive
exports.getUsersSearch = [
  query("username").trim().escape().isLength({ min: 1, max: 15 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await getUsers(req.query.username);

    return res.json(response);
  }),
];

// post a new request
exports.postRequest = [
  query("requesteeid").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await postRequest(req.user.id, req.query.requesteeid);

    return res.json(response);
  }),
];
