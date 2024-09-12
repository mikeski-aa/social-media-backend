const { prisma } = require("../config/db");

async function getStatusesForUser(userid, limit) {
  try {
    const response = await prisma.post.findMany({
      where: {
        userId: +userid,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        postDate: "desc",
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

getStatusesForUser(17, 99);

module.exports = { getStatusesForUser };
