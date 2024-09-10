const { prisma } = require("../config/db");

async function getLikeArrayForPost(postid, userid) {
  try {
    const response = await prisma.post.findFirst({
      where: {
        id: +postid,
        likes: {
          has: +userid,
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getLikeArrayForPost };
