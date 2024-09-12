const { prisma } = require("../config/db");

async function deleteRequestFromIds(requesterid, requesteeid) {
  try {
    const response = await prisma.request.deleteMany({
      where: {
        requesterId: +requesterid,
        requesteeId: +requesteeid,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { deleteRequestFromIds };
