import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLResolveInfo,
} from "graphql";
import { UserType } from "./typedef";
import { getAllUsers, getUserByID } from "./database";

export default {
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getUserByID(args.id);
        },
    },
    users: {
        type: new GraphQLList(UserType),
        resolve: async (src: any, args: GraphQLResolveInfo) => {
            return await getAllUsers();
        },
    },
};
