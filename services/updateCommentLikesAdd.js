const { prisma } = require("../config/db");

async function updateCommentLikesAdd(commentid, userid) {
  try {
    console.log("in add function");
    const response = await prisma.comment.update({
      where: {
        id: +commentid,
      },
      data: {
        likes: {
          push: +userid,
        },
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateCommentLikesAdd };
