import { EventType } from "@models/event/typedef";
import { ProductType } from "@models/product/typedef";
import { GraphQLDate } from "@models/typedef";
import { UserType } from "@models/user/typedef";
import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLUnionType,
} from "graphql";

export const BaseRecordType: GraphQLObjectType = new GraphQLObjectType({
    name: "BaseRecord",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        check: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLDate) },
        note: { type: GraphQLString },
        event: { type: EventType },
        author: { type: new GraphQLNonNull(UserType) },
    }),
});

export const DonationRecordType: GraphQLObjectType = new GraphQLObjectType({
    name: "DonationRecord",
    fields: () => ({
        base: { type: new GraphQLNonNull(BaseRecordType) },
        donor: { type: GraphQLString },
    }),
});

export const SaleRecordType: GraphQLObjectType = new GraphQLObjectType({
    name: "SaleRecord",
    fields: () => ({
        base: { type: new GraphQLNonNull(BaseRecordType) },
        product: { type: new GraphQLNonNull(ProductType) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        buyer: { type: GraphQLString },
    }),
});

export const PaymentRecordType: GraphQLObjectType = new GraphQLObjectType({
    name: "PaymentRecord",
    fields: () => ({
        base: { type: new GraphQLNonNull(BaseRecordType) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const RecordType: GraphQLUnionType = new GraphQLUnionType({
    name: "Record",
    types: [DonationRecordType, SaleRecordType, PaymentRecordType],
    // @ts-ignore
    resolveType: (value) => {
        return value.donor
            ? DonationRecordType
            : value.product
            ? SaleRecordType
            : value.description
            ? PaymentRecordType
            : undefined;
    },
});
