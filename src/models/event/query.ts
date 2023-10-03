import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { EventType } from "./typedef";
import { getAllEvents, getEventById } from "./database";

export default {
    event: {
        type: EventType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getEventById(args.id);
        },
    },
    events: {
        type: new GraphQLList(EventType),
        resolve: async (src: any, args: any) => {
            return await getAllEvents();
        },
    },
};
