import { builder } from "@models/builder";
import { prisma } from "@models/client";

import { Shift } from "@models/objects/Shift";

builder.mutationFields((t) => ({
  createShift: t.prismaField({
    type: Shift,
    args: {
      eventId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.shift.create({
        data: {
          eventId: args.eventId,
        },
      }),
  }),
  deleteShift: t.prismaField({
    type: Shift,
    args: {
      shiftId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.shift.delete({ where: { id: args.shiftId } }),
  }),
}));
