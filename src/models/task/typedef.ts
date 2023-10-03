import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

export const TaskType: GraphQLObjectType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        eventId: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
    }),
});
