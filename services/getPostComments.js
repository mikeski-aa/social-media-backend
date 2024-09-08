const { prisma } = require("./config/db");

async function findPosts(postid) {
  console.log("GET comment SERVICE FUNCTION");

  try {
    const response = await prisma.comment.findMany({
      where: {
        postId: +postid,
      },
      orderBy: {
        commentDate: "desc",
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
