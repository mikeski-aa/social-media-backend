const { prisma } = require("../config/db");

async function getUsers(name, userid) {
  try {
    const response = await prisma.user.findMany({
      where: {
        username: {
          contains: name,
          mode: "insensitive",
        },
        id: {
          not: +userid,
        },
      },
      include: {
        friendOf: true,
        reqOut: true,
        reqIn: true,
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
