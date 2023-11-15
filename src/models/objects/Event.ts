import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";
import { builder } from "../builder";
import { User } from "./User";

export const Event: PrismaObjectRef<PrismaModelTypes> = builder.prismaObject(
  "Event",
  {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      path: t.exposeString("path"),
      start: t.expose("start", { type: "Date" }),
      end: t.expose("end", { type: "Date" }),
      shifts: t.relation("shifts"),
      users: t.field({
        select: (args, ctx, nestedSelection) => ({
          users: {
            select: {
              user: nestedSelection(true),
            },
          },
        }),
        type: [User],
        resolve: (event) => {
          return event.users?.map(({ user }) => user);
        },
      }),
    }),
  },
);
