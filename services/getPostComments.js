const { prisma } = require("./config/db");

async function getPostComments(postid) {
  try {
    const response = await prisma.comment.findMany({
      where: {
        postId: +postid,
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        commentDate: "desc",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getPostComments };
