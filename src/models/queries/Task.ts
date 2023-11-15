import { builder } from "@models/builder";
import { prisma } from "@models/client";

builder.queryFields((t) => ({
  tasks: t.prismaField({
    type: ["Task"],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.task.findMany({ ...query }),
  }),
  task: t.prismaField({
    type: "Task",
    args: {
      taskId: t.arg({
        type: "String",
      }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.task.findUniqueOrThrow({
        ...query,
        where: { id: args.taskId ? args.taskId : "" },
      }),
  }),
}));
