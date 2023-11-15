import { Router } from "express";

// import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/http";

// Prisma
import { prisma, builder } from "@utils/index";

// Import models
/*
import { userQuery, userMutation } from "@models/user";
import { eventMutation, eventQuery } from "@models/event";
import { taskMutation, taskQuery } from "@models/task";
import { shiftMutation, shiftQuery } from "@models/shift";
import { productMutation, productQuery } from "@models/product";
import { recordMutation, recordQuery } from "@models/records";
*/

const User = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    username: t.exposeString("username"),
    email: t.exposeString("username"),
    tasks: t.field({
      select: (args, ctx, nestedSelection) => ({
        tasks: {
          select: {
            // This will look at what fields are queried on Media
            // and automatically select uploadedBy if that relation is requested
            tasks: nestedSelection(
              // This arument is the default query for the media relation
              // It could be something like: `{ select: { id: true } }` instead
              true,
            ),
          },
        },
      }),
      type: [Task],
      resolve: (user) => user.tasks.map(({ tasks }) => tasks),
    }),
  }),
});

const Task = builder.prismaObject("Task", {
  select: {
    id: true,
  },
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    status: t.exposeString("status"),
    description: t.exposeString("description", { nullable: true }),
  }),
});

builder.queryType({});

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  }),
);

/*
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
*/

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
