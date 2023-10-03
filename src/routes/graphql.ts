import { Router } from "express";

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/http";

import { userQuery, userMutation } from "@models/user";
import { eventMutation, eventQuery } from "@models/event";
import { taskMutation, taskQuery } from "@models/task";
import { shiftMutation, shiftQuery } from "@models/shift";
import { productMutation, productQuery } from "@models/product";
import { recordMutation, recordQuery } from "@models/records";

const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQuery,
        ...eventQuery,
        ...taskQuery,
        ...shiftQuery,
        ...productQuery,
        ...recordQuery,
    },
});

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutation,
        ...eventMutation,
        ...taskMutation,
        ...shiftMutation,
        ...productMutation,
        ...recordMutation,
    },
});

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
});

const router = Router();
router.all("/", createHandler({ schema }));

export default router;
