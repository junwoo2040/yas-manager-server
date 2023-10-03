import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ShiftType } from "./typedef";
import { getAllShifts, getShiftById } from "./database";

export default {
    shift: {
        type: ShiftType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getShiftById(args.id);
        },
    },
    shifts: {
        type: new GraphQLList(ShiftType),
        resolve: async (src: any, args: any) => {
            return await getAllShifts();
        },
    },
};
