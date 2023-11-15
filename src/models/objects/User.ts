import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

import { Task } from "./Task";
import { Event } from "./Event";
import { Shift } from "./Shift";

export const User: PrismaObjectRef<PrismaModelTypes> = builder.prismaObject(
  "User",
  {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      firstName: t.exposeString("firstName"),
      lastName: t.exposeString("lastName"),
      username: t.exposeString("username", { nullable: true }),
      records: t.relation("records"),
      tasks: t.field({
        select: (args, ctx, nestedSelection) => ({
          tasks: {
            select: {
              task: nestedSelection(true),
            },
          },
        }),
        type: [Task],
        resolve: (user) => {
          return user.tasks?.map(({ task }) => task);
        },
      }),
      events: t.field({
        select: (args, ctx, nestedSelection) => ({
          events: {
            select: {
              event: nestedSelection(true),
            },
          },
        }),
        type: [Event],
        resolve: (user) => {
          return user.events?.map(({ event }) => event);
        },
      }),
      shifts: t.field({
        select: (args, ctx, nestedSelection) => ({
          shifts: {
            select: {
              shift: nestedSelection(true),
            },
          },
        }),
        type: [Shift],
        resolve: (user) => {
          return user.shifts?.map(({ shift }) => shift);
        },
      }),
    }),
  },
);
