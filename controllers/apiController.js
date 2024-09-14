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
const { getIncomingRequests } = require("../services/getIncomingRequests");
const { updateFriendsAccept } = require("../services/updateFriendsAccept");
const { deleteRequest } = require("../services/deleteRequest");
const { deleteFriend } = require("../services/deleteFriend");
const { deleteRequestFromIds } = require("../services/deleteRequestFromIds");
const { getStatusesForUser } = require("../services/getStatusesForUser");
const { getCommentsForUser } = require("../services/getCommentsForUser");
const { getUser } = require("../services/getUser");
const { updateUserAvatar } = require("../services/updateUserAvatar");
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

    const response = await getUsers(req.query.username, req.user.id);

    return res.json(response);
  }),
];

// post a new request
// TODO: ADD DUPLICATE CHECKING!
exports.postRequest = [
  body("requesteeid").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await postRequest(req.user.id, req.body.requesteeid);

    return res.json(response);
  }),
];

//get all incoming requests
exports.getIncomingRequests = asyncHandler(async (req, res, next) => {
  const response = await getIncomingRequests(req.user.id);

  return res.json(response);
});

// update user to accept request connecting friends
exports.putFriendAccept = [
  query("requesterid").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await updateFriendsAccept(
      req.user.id,
      req.query.requesterid
    );

    const deleteReq = await deleteRequestFromIds(
      req.query.requesterid,
      req.user.id
    );

    console.log(deleteReq);
    return res.json(response);
  }),
];

// delete request
exports.deleteRequest = [
  query("reqid").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await deleteRequest(req.query.reqid);

    return res.json(response);
  }),
];

// delete / disconnect friend
exports.deleteFriend = [
  query("friendid").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await deleteFriend(req.user.id, req.query.friendid);
    return res.json(response);
  }),
];

// get all posts/statuses for given user, taking limit into account
exports.getStatusesForUser = [
  query("limit").trim().escape().toInt(),
  query("id").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }
    console.log("//////////////////");
    console.log(req.query.id);
    console.log(isNaN(req.query.id));

    if (isNaN(req.query.id)) {
      const posts = await getStatusesForUser(req.user.id, req.query.limit);
      return res.json(posts);
    } else {
      const posts = await getStatusesForUser(req.query.id, req.query.limit);
      return res.json(posts);
    }
  }),
];

// get all comments for given user, taking limit into account
exports.getCommentsForUser = [
  query("limit").trim().escape().toInt(),
  query("id").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    // if NaN => means no ID provided => means we are loading in our own profile
    console.log("//////////////////");
    console.log(req.query.id);
    console.log(isNaN(req.query.id));

    if (isNaN(req.query.id)) {
      const comments = await getCommentsForUser(req.user.id, req.query.limit);
      return res.json(comments);
    } else {
      const comments = await getCommentsForUser(req.query.id, req.query.limit);
      return res.json(comments);
    }
  }),
];

// get specific user based on id
exports.getUser = [
  query("id").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Error with query value" });
    }

    const response = await getUser(req.query.id);
    return res.json(response);
  }),
];

// upload new user picture
exports.postAvatar = asyncHandler(async (req, res, next) => {
  console.log(req.file.path);
  const response = await postPicture(req.file.path);

  // update user
  const userUpdate = await updateUserAvatar(req.user.id, response.result.url);

  return res.json(userUpdate);
});

// upload new user banner
