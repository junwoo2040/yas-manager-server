import { Prisma } from "@prisma/client";

import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";
import ValidationPlugin from "@pothos/plugin-validation";

import { prisma } from "./client";
import { DateResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: true;
  DefaultInputFieldRequiredness: true;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  defaultFieldNullability: true,
  defaultInputFieldRequiredness: true,
  plugins: [PrismaPlugin, ValidationPlugin],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
    filterConnectionTotalCount: true,
  },
  validationOptions: {
    validationError: (zodError, args, context, info) => {
      return zodError;
    },
  },
});

builder.addScalarType("Date", DateResolver, {});
