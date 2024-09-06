const { prisma } = require("../config/db");

async function postStatus(text, url, user) {
  console.log("POST STATUS SERVICE FUNCTION");
  console.log(text, url, user);

  try {
    const response = await prisma.post.create({
      data: {
        userId: +user.id,
        imageUrl: url,
        text: text,
        likes: 0,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { postStatus };
