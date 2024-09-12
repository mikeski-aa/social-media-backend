const { prisma } = require("../config/db");

async function deleteFriend(useridA, useridB) {
  try {
    const [connectA, connectB] = await Promise.all([
      prisma.user.update({
        where: {
          id: +useridA,
        },
        data: {
          friends: {
            disconnect: [{ id: +useridB }],
          },
        },
      }),
      prisma.user.update({
        where: {
          id: +useridB,
        },
        data: {
          friends: {
            disconnect: [{ id: +useridA }],
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

module.exports = { deleteFriend };
