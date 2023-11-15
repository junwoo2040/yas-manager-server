import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

import { User } from "./User";

export const Task: PrismaObjectRef<PrismaModelTypes> = builder.prismaObject(
  "Task",
  {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      title: t.exposeString("title"),
      description: t.exposeString("description", { nullable: true }),
      start: t.expose("start", { type: "Date", nullable: true }),
      end: t.expose("end", { type: "Date", nullable: true }),
      assignees: t.field({
        select: (args, ctx, nestedSelection) => ({
          assignees: {
            select: {
              user: nestedSelection(true),
            },
          },
        }),
        type: [User],
        resolve: (task) => {
          return task.assignees?.map(({ user }) => user);
        },
      }),
      childTasks: t.relation("childTasks"),
      parentTask: t.relation("parentTask"),
    }),
  },
);
