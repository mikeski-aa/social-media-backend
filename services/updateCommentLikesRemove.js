const { prisma } = require("../config/db");

async function updateCommentLikesRemove(commentid, likeArray) {
  try {
    const response = await prisma.comment.update({
      where: {
        id: +commentid,
      },
      data: {
        likes: likeArray,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateCommentLikesRemove };
