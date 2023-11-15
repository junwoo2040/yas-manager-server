import { builder } from "@models/builder";
import { prisma } from "@models/client";

import { User } from "@models/objects/User";

import { encrypt } from "@utils/encrypt";

const UserCreateInput = builder.inputType("UserCreateInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
    username: t.string(),
    password: t.string({ required: true }),
  }),
});

const UserMutationInput = builder.inputType("UserMutationInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
    email: t.string(),
    firstName: t.string(),
    lastName: t.string(),
    username: t.string(),
    password: t.string(),
  }),
});

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserCreateInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.create({
        data: {
          ...input,
          username: input.username || `${input.firstName} ${input.lastName}`,
          password: await encrypt(input.password, 10),
        },
      }),
  }),
  deleteUser: t.prismaField({
    type: User,
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.user.delete({ where: { id: args.userId } }),
  }),
  updateUser: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserMutationInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      // Exclude unwanted args and set null as undefined
      let { userId, ...newArgs } = Object.fromEntries(
        Object.entries(input).map(([key, value]) => [key, value || undefined]),
      );

      return await prisma.user.update({
        where: { id: userId },
        data: { ...newArgs },
      });
    },
  }),
}));
