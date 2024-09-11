const { prisma } = require("../config/db");

async function postRequest(requesterid, requesteeid) {
  console.log(requesterid, requesteeid);
  try {
    const response = await prisma.request.create({
      data: {
        requester: { connect: { id: +requesterid } },
        requestee: { connect: { id: +requesteeid } },
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { postRequest };
