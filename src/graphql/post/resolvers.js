const posts = async (_, { input }, { getPosts }) => {
  const apiFiltersInput = new URLSearchParams(input).toString();
  // console.log(apiFiltersInput);
  const posts = await getPosts(apiFiltersInput);
  return posts.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();
  if (!post.id) {
    return {
      statusCode: 404,
      message: 'Post not found',
    };
  }
  // console.log(post);
  return post;
};

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Post: {
    // user: (parent) => {
    //   return users.find((user) => user.id === parent.userId);
    // },
    // parent 'e o proprio objeto, Posts/Post
    unixTimestamp: (parent) => {
      return Math.floor(new Date(parent.createdAt).getTime() / 1000);
    },
  },
  PostResult: {
    __resolveType: (obj) => {
      if (obj.id) return 'Post';
      if (obj.statusCode) return 'PostNotFoundError';
      return null;
    },
  },
};
