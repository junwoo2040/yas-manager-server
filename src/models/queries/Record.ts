import { builder } from "@models/builder";
import { prisma } from "@models/client";

builder.queryFields((t) => ({
  records: t.prismaField({
    type: ["Record"],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.record.findMany({ ...query }),
  }),
  record: t.prismaField({
    type: "Record",
    args: {
      userId: t.arg({
        type: "String",
      }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.record.findUniqueOrThrow({
        ...query,
        where: { id: args.userId ? args.userId : "" },
      }),
  }),
}));
