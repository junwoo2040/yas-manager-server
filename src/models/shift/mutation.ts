import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ShiftType } from "./typedef";
import { addShift } from "./database";
import { GraphQLDate } from "@models/typedef";

export default {
    addShift: {
        type: ShiftType,
        args: {
            start: { type: new GraphQLNonNull(GraphQLDate) },
            end: { type: new GraphQLNonNull(GraphQLDate) },
            parentEvent: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await addShift({
                ...args,
            });
        },
    },
};
