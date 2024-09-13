const { prisma } = require("../config/db");

async function getUser(userid) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        id: +userid,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// getUser(99);

module.exports = { getUser };
