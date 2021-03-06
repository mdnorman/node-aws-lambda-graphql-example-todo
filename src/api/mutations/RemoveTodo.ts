import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import { UserType } from '../model/User';
import { getViewer, removeTodo } from '../../services/database';

export const RemoveTodo = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedTodoId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    viewer: {
      type: UserType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({ id }) => {
    const localTodoId = fromGlobalId(id).id;
    removeTodo(localTodoId);
    return { id };
  },
});
