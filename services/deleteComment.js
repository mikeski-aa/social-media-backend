const { prisma } = require("../config/db");

async function deleteComment(commentid) {
  try {
    const response = await prisma.comment.delete({
      where: {
        id: +commentid,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { deleteComment };
