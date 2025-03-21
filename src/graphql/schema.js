import { gql } from 'apollo-server';
import { userTypesDefs } from './user/typedefs.js';
import { userResolvers } from './user/resolvers.js';
import { postTypeDefs } from './post/typedefs.js';
import { postResolvers } from './post/resolvers.js';
import { apiFiltersTypeDefs } from './api-filters/typedefs.js';

const rootType = gql`
  type Query {
    _empty: Boolean
  }
`;

const rootResolver = {
  Query: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootType,
  userTypesDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
];
export const resolvers = [rootResolver, userResolvers, postResolvers];
