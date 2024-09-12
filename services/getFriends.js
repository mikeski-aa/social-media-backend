const { prisma } = require("../config/db");

async function getFriends(userid) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        id: +userid,
      },
      select: {
        friends: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = { getFriends };
