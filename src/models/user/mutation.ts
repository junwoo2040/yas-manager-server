import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "./typedef";
import { addUser } from "./database";

export default {
    addUser: {
        type: UserType,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            username: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            role: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            return await addUser({ ...args });
        },
    },
};
