const { prisma } = require("../config/db");

async function postNewUser(username, email, hash) {
  try {
    const response = await prisma.user.create({
      data: {
        username: username,
        email: email,
        hash: hash,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

module.exports = { postNewUser };
