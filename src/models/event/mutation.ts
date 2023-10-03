import { GraphQLNonNull, GraphQLString } from "graphql";
import { EventType } from "./typedef";
import { addEvent } from "./database";
import { GraphQLDate } from "@models/typedef";

export default {
    addEvent: {
        type: EventType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            start: { type: new GraphQLNonNull(GraphQLDate) },
            end: { type: new GraphQLNonNull(GraphQLDate) },
            location: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
        },
        resolve: async (src: any, args: any) => {
            return await addEvent({
                ...args,
            });
        },
    },
};
