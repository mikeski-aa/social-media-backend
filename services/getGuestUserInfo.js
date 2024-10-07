const { prisma } = require("../config/db");

async function getGuestUserInfo(email) {
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getGuestUserInfo };
