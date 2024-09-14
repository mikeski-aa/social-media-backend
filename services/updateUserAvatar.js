const { prisma } = require("../config/db");

async function updateUserAvatar(userid, url) {
  try {
    const response = await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        profilePic: url,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateUserAvatar };
