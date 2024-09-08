const { prisma } = require("./config/db");

async function createUser(username, email, hash) {
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

async function test(params) {
  const response = await prisma.user.findMany({
    include: {
      friends: true,
    },
  });

  console.log(response[0]);
}

// createUser("testUser", "xd@xd.com", "asdasdASAXSXA");
// createUser("Deasd", "de@xd.com", "ddasdasdqqwe");

async function updateFriendsList(userA, userB) {
  const responseOne = await prisma.user.update({
    where: {
      id: +userA,
    },
    data: {
      friends: { connect: [{ id: +userB }] },
    },
  });

  const responseTwo = await prisma.user.update({
    where: {
      id: +userB,
    },
    data: {
      friends: { connect: [{ id: +userA }] },
    },
  });

  return responseOne, responseTwo;
}

async function poststatus(text, url, user) {
  console.log("POST STATUS SERVICE FUNCTION");
  console.log(text, url, user);

  try {
    const response = await prisma.post.create({
      data: {
        userId: +user,
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

async function getposts(userA) {
  const responseOne = await prisma.user.findMany({
    skip: 0,
    take: 1,
    where: {
      id: +userA,
    },
    select: {
      friends: {
        select: {
          posts: true,
          username: true,
        },
      },
    },
    take: 1,
  });

  const tempArray = [];

  // for (let x = 0; x < responseOne[0].friends.length; x++) {
  //   for (let y = 0; y < responseOne[0].friends[x].posts.length; y++) {
  //     tempArray.push(responseOne[0].friends[x].posts[y]);
  //   }
  // }

  // for (let x = 0; x < responseOne[0].posts.length; x++) {
  //   tempArray.push(responseOne[0].posts[x]);
  // }

  console.log(responseOne[0].friends);

  return tempArray;
}
// poststatus("19 post", "basdasdasdasdasdas", 19);
// updateFriendsList(17, 19);
// test();
// getposts(17);

////////// populate db with some comments
async function postComment(text, postid, user) {
  console.log("POST comment SERVICE FUNCTION");

  try {
    const response = await prisma.comment.create({
      data: {
        userId: +user,
        text: text,
        postId: +postid,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// postComment("My first comment on this post!", 14, 17);
// postComment("Testing the comment feature", 14, 18);
// postComment("mOST RECENT COMMENT", 14, 17);

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

findPosts(14);
