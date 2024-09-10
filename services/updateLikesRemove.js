const { prisma } = require("../config/db");

async function updateLikesRemove(postid, likeArray) {
  try {
    const response = await prisma.post.update({
      where: {
        id: +postid,
      },
      data: {
        likes: likeArray,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { updateLikesRemove };
