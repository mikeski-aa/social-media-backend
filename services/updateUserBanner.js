const { prisma } = require("../config/db");

async function updateUserBanner(userid, url) {
  try {
    const response = await prisma.user.update({
      where: {
        id: +userid,
      },
      data: {
        backgroundPic: url,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateUserBanner };
