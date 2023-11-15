import { PrismaClient } from "@prisma/client";

import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";

export const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});
