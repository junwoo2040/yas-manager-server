import { UserType } from "@models/user/typedef";
import { EventType } from "@models/event/typedef";

import { GraphQLDate } from "@models/typedef";
import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} from "graphql";

export const ShiftType: GraphQLObjectType = new GraphQLObjectType({
    name: "Shift",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        start: { type: new GraphQLNonNull(GraphQLDate) },
        end: { type: new GraphQLNonNull(GraphQLDate) },
        parentEvent: { type: new GraphQLNonNull(EventType) },
    }),
});

export const ShiftBlockType: GraphQLObjectType = new GraphQLObjectType({
    name: "ShiftBlock",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        start: { type: new GraphQLNonNull(GraphQLDate) },
        end: { type: new GraphQLNonNull(GraphQLDate) },
        parentShift: { type: new GraphQLNonNull(ShiftType) },
        members: { type: new GraphQLList(UserType) },
    }),
});
