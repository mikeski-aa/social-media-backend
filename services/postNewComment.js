const { prisma } = require("../config/db");

async function postNewComment(userid, postid, text) {
  try {
    const response = await prisma.comment.create({
      data: {
        postId: +postid,
        userId: +userid,
        text: text,
      },
    });
    return response;d
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { postNewComment };
