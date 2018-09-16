import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import { getTodos } from '../../services/database';
import { TodosConnection } from './Todo';
import { nodeInterface } from './nodeDefinitions';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (obj, { status, ...args }) => connectionFromArray(getTodos(status), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getTodos().length,
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getTodos('completed').length,
    },
  },
  interfaces: [nodeInterface],
});
