import { builder } from "@models/builder";
import { prisma } from "@models/client";

import { Event } from "@models/objects/Event";

import { pathify } from "@utils/pathify";

import { z } from "zod";

const CreateEventInput = builder.inputType("CreateEventInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    start: t.string({ required: true }),
    end: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createEvent: t.prismaField({
    type: Event,
    args: {
      input: t.arg({ type: CreateEventInput, required: true }),
    },
    validate: {
      schema: z.object({
        input: z.object({
          name: z.string().refine((value) => value.match(/\w+/g) !== undefined),
          start: z.string(),
          end: z.string(),
        }),
      }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.event.create({
        data: {
          name: input.name,
          path: pathify(input.name),
          start: new Date(input.start),
          end: new Date(input.end),
        },
      }),
  }),
  deleteEvent: t.prismaField({
    type: Event,
    args: {
      eventId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.event.delete({ where: { id: args.eventId } }),
  }),
}));
