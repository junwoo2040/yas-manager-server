import { builder } from "@models/builder";
import { prisma } from "@models/client";

import { Record } from "@models/objects/Record";

builder.mutationFields((t) => ({
  createRecord: t.prismaField({
    type: Record,
    args: {
      amount: t.arg.float({ required: true }),
      authorId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.record.create({
        data: {
          amount: args.amount,
          authorId: args.authorId,
        },
      }),
  }),
  deleteRecord: t.prismaField({
    type: Record,
    args: {
      recordId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.record.delete({ where: { id: args.recordId } }),
  }),
}));
