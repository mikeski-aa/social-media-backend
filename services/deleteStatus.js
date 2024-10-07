const { prisma } = require("../config/db");

async function deleteStatus(statusid) {
  try {
    const response = await prisma.post.delete({
      where: {
        id: +statusid,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { deleteStatus };
