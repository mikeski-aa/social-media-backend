const { prisma } = require("../config/db");

async function deleteRequest(reqid) {
  try {
    const response = await prisma.request.delete({
      where: {
        id: +reqid,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { deleteRequest };
