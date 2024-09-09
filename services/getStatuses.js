const { prisma } = require("../config/db");

async function getStatuses(idArray, limit) {
  try {
    const response = await prisma.post.findMany({
      where: {
        userId: {
          in: idArray,
        },
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

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStatuses };
