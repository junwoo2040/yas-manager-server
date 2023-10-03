import { RecordType } from "@models/records/typedef";
import { ShiftType } from "@models/shift/typedef";
import { TaskType } from "@models/task/typedef";
import { UserType } from "@models/user/typedef";

import { GraphQLDate } from "@models/typedef";
import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

export const EventType: GraphQLObjectType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        start: { type: GraphQLDate },
        end: { type: GraphQLDate },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        members: { type: new GraphQLList(UserType) },
        shifts: { type: new GraphQLList(ShiftType) },
        tasks: { type: new GraphQLList(TaskType) },
        records: { type: new GraphQLList(RecordType) },
    }),
});
