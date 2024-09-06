const { prisma } = require("../config/db");

async function getStatuses(userid) {
  try {
    const response = await prisma.post.findMany({
      where: {
        userId: +userid,
      },
      include: {
        user: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getStatuses };
