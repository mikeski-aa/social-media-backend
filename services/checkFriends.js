const { prisma } = require("../config/db");

async function checkFriends(currentUser, targetUser) {
  try {
    const response = await prisma.user.findMany({
      where: {
        id: +targetUser,
        friends: {
          some: {
            id: +currentUser,
          },
        },
      },
    });

    if (response.length >= 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

checkFriends(17, 19);

module.exports = { checkFriends };
