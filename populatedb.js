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
      friendOf: true,
    },
  });

  console.log(response);
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

async function getposts(userA) {
  const responseOne = await prisma.user.findMany({
    where: {
      id: +userA,
    },
    select: {
      friends: {
        select: {
          posts: true,
        },
      },
      posts: true,
    },
  });

  console.log(responseOne[0]);

  return responseOne;
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
// poststatus("testtest", "xd", 18);
// updateFriendsList(17, 18);
// test();
getposts(17);
