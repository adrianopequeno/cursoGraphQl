const posts = async (_, { input }, { getPosts }) => {
  const apiFiltersInput = new URLSearchParams(input).toString();
  // console.log(apiFiltersInput);
  const posts = await getPosts(apiFiltersInput);
  return posts.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();

  if (Math.random() > 0.3) {
    return {
      statusCode: 408,
      message: 'Request timeout',
      timeout: 123,
    };
  }

  if (!post.id) {
    return {
      statusCode: 404,
      message: 'Post not found',
      postId: id,
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
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
  PostError: {
    __resolveType: (obj) => {
      if (obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (obj.statusCode !== 'undefined') return 'PostTimeoutError';
      return null;
    },
  },
};
