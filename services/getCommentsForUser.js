const { prisma } = require("../config/db");

async function getCommentsForUser(userid, limit) {
  try {
    const response = await prisma.comment.findMany({
      where: {
        userId: +userid,
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
      take: limit,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getCommentsForUser };

// getCommentsForUser(17, 10);
