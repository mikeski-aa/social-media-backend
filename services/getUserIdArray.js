const { prisma } = require("./config/db");

async function getUserIdArray(userId) {
  try {
    const response = await prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        friends: {
          select: {
            id: true,
          },
        },
      },
    });

    const postList = response.flatMap((user) =>
      user.friends.flatMap((friend) => friend.id)
    );

    postList.push(response[0].id);

    console.log(postList);

    return postList;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getUserIdArray };
