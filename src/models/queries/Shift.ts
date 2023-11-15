import { builder } from "@models/builder";
import { prisma } from "@models/client";

builder.queryFields((t) => ({
  shifts: t.prismaField({
    type: ["Shift"],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.shift.findMany({ ...query }),
  }),
  shift: t.prismaField({
    type: "Shift",
    args: {
      userId: t.arg({
        type: "String",
      }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.shift.findUniqueOrThrow({
        ...query,
        where: { id: args.userId ? args.userId : "" },
      }),
  }),
}));
