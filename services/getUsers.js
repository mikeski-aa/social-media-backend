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
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getUsers };
