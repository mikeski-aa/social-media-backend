const { prisma } = require("../config/db");

async function getUsers(name) {
  try {
    const response = await prisma.user.findMany({
      where: {
        username: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        friendOf: true,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getUsers };
