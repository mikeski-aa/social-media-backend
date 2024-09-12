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

// get status
router.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  apiController.getStatus
);

// get all comments for a post
router.get(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  apiController.getComments
);

// post a comment to a post
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  apiController.postComment
);

// update post likes
router.put(
  "/status/likes",
  passport.authenticate("jwt", { session: false }),
  apiController.putLike
);

// update comment likes
router.put(
  "/comments/likes",
  passport.authenticate("jwt", { session: false }),
  apiController.putLikeComment
);

// get user friends
router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  apiController.getFriends
);

// get all users searched for
router.get(
  "/user/all",
  passport.authenticate("jwt", { session: false }),
  apiController.getUsersSearch
);

// create a new friend request
router.post(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  apiController.postRequest
);

// get all incoming reqs
router.get(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  apiController.getIncomingRequests
);

// update friends connecting them / accepting friend request
router.put(
  "/friends/accept",
  passport.authenticate("jwt", { session: false }),
  apiController.putFriendAccept
);

// decline friend request
router.delete(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteRequest
);

// delete / disconnect friend
router.put(
  "/friends/delete",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteFriend
);

module.exports = router;
