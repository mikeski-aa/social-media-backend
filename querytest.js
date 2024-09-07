const { prisma } = require("./config/db");

async function getPostsWithUname(userId) {
  const response = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  console.log(response);
}

// getPostsWithUname();

async function getFriendPosts(userId) {
  const response = await prisma.user.findMany({
    where: {
      id: userId,
    },
    include: {
      friends: {
        select: {
          posts: {
            select: {
              id: true,
              text: true,
              imageUrl: true,
              likes: true,
              postDate: true,
              user: {
                select: {
                  username: true,
                  id: true,
                  profilePic: true,
                },
              },
            },
            take: 1,
          },
        },
      },
    },
  });

  // map response to get one array
  const mapPosts = response.flatMap((user) =>
    user.friends.flatMap((friend) => friend.posts)
  );

  console.log(mapPosts);
}

// getFriendPosts(17);

async function test(userId) {
  const response = await prisma.post.findMany({
    where: {
      user: {
        friends: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
          profilePic: true,
        },
      },
    },
    orderBy: {
      postDate: "desc",
    },
    take: 5,
  });

  console.log(response);
}

// test(17);

async function desd(userId) {
  const response = await prisma.user.findMany({
    where: {
      id: userId,
    },
    include: {
      friends: {
        select: {
          id: true,
        },
      },
    },
  });

  let queryid = [];
  const postList = response.flatMap((user) =>
    user.friends.flatMap((friend) => friend.id)
  );
  postList.push(response[0].id);
  console.log(postList);
}
// desd(17);
