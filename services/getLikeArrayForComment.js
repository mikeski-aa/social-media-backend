const { prisma } = require("../config/db");

async function getLikeArrayForComment(commentid) {
  try {
    const response = await prisma.comment.findFirst({
      where: {
        id: +commentid,
      },
      select: {
        likes: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getLikeArrayForComment };
