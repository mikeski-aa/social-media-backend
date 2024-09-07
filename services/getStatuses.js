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

getStatuses([17, 18], 99);

module.exports = { getStatuses };
