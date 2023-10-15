import { Router } from "express";

// import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/http";

// Prisma
import { prisma } from "@utils/index";

// Pothos
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

// Import models
import { userQuery, userMutation } from "@models/user";
import { eventMutation, eventQuery } from "@models/event";
import { taskMutation, taskQuery } from "@models/task";
import { shiftMutation, shiftQuery } from "@models/shift";
import { productMutation, productQuery } from "@models/product";
import { recordMutation, recordQuery } from "@models/records";

const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.prismaObject("User", {});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `Hello, ${name || "World"}`,
    }),
  }),
});

/*
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
*/

/*
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
*/

const schema = builder.toSchema();

const router = Router();
router.all("/", createHandler({ schema }));

export default router;
