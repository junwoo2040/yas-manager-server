import { builder } from "@models/builder";
import { prisma } from "@models/client";

const EventSearchInput = builder.inputType("EventSearchInput", {
  fields: (t) => ({
    path: t.string(),
  }),
});

builder.queryFields((t) => ({
  events: t.prismaField({
    type: ["Event"],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.event.findMany(),
  }),
  event: t.prismaField({
    type: "Event",
    args: {
      input: t.arg({ type: EventSearchInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      return prisma.event.findUniqueOrThrow({
        where: { path: input.path || undefined },
      });
    },
  }),
}));
