const { prisma } = require("../config/db");

async function getLikeArrayForPost(postid, userid) {
  try {
    const response = await prisma.post.findFirst({
      where: {
        id: +postid,
      },
      select: {
        likes: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getLikeArrayForPost };
