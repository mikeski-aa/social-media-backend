const { prisma } = require("../config/db");

async function updateLikesAdd(postid, userid) {
  try {
    const response = await prisma.post.update({
      where: {
        id: +postid,
      },
      data: {
        likes: {
          push: +userid,
        },
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateLikesAdd };
