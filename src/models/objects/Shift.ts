import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

import { User } from "./User";

export const Shift: PrismaObjectRef<PrismaModelTypes> = builder.prismaObject(
  "Shift",
  {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      start: t.expose("start", { type: "Date", nullable: true }),
      end: t.expose("end", { type: "Date", nullable: true }),
      volunteers: t.field({
        select: (args, ctx, nestedSelection) => ({
          volunteers: {
            select: {
              user: nestedSelection(true),
            },
          },
        }),
        type: [User],
        resolve: (shift) => {
          return shift.volunteers?.map(({ user }) => user);
        },
      }),
      event: t.relation("event"),
    }),
  },
);
