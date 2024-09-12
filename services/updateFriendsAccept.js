const { prisma } = require("../config/db");

async function updateFriendsAccept(useridA, useridB) {
  try {
    const [connectA, connectB] = await Promise.all([
      prisma.user.update({
        where: {
          id: +useridA,
        },
        data: {
          friends: {
            connect: [{ id: +useridB }],
          },
        },
      }),
      prisma.user.update({
        where: {
          id: +useridB,
        },
        data: {
          friends: {
            connect: [{ id: +useridA }],
          },
        },
      }),
    ]);

    return { connectA, connectB };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateFriendsAccept };
