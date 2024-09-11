const { prisma } = require("../config/db");

async function postRequest(requesterid, requesteeid) {
  try {
    const response = await prisma.request.create({
      data: {
        requesterid: +requesterid,
        requesteeid: +requesteeid,
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
