import { builder } from "../builder";

export const Record = builder.prismaObject("Record", {
  fields: (t) => ({
    id: t.exposeID("id"),
    amount: t.exposeFloat("amount"),
    createdAt: t.expose("createdAt", { type: "Date" }),
    author: t.relation("author"),
  }),
});
