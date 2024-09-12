const { prisma } = require("../config/db");

async function getIncomingRequests(userid) {
  try {
    const response = await prisma.request.findMany({
      where: {
        requesteeId: +userid,
      },
      include: {
        requester: {
          select: {
            username: true,
            id: true,
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

getIncomingRequests(20);
module.exports = { getIncomingRequests };
