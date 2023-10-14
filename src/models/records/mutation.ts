import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";

import {
    RecordType as RecType,
    DonationRecordType,
    PaymentRecordType,
    SaleRecordType,
} from "./typedef";
import { GraphQLDate } from "@models/typedef";

import { addRecord } from "./database";
import { getUserByID } from "@models/user/database";
import { getEventById } from "@models/event/database";
import { getProductById } from "@models/product/database";

export default {
    addDonationRecord: {
        type: DonationRecordType,
        args: {
            type: { type: new GraphQLNonNull(GraphQLString) },
            check: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            note: { type: GraphQLString },
            eventId: { type: GraphQLID },
            authorId: { type: new GraphQLNonNull(GraphQLID) },
            donor: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            const { id, type, check, date, note, eventId, authorId, donor } =
                await addRecord({ ...args });

            const author = await getUserByID(authorId);
            const event = eventId ? await getEventById(eventId) : null;

            return {
                base: {
                    id,
                    type,
                    check,
                    date,
                    note,
                    event,
                    author,
                },
                donor,
            };
        },
    },
    addSaleRecord: {
        type: SaleRecordType,
        args: {
            type: { type: new GraphQLNonNull(GraphQLString) },
            check: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            note: { type: GraphQLString },
            eventId: { type: GraphQLID },
            authorId: { type: new GraphQLNonNull(GraphQLID) },
            productId: { type: new GraphQLNonNull(GraphQLID) },
            quantity: { type: new GraphQLNonNull(GraphQLInt) },
            buyer: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            const {
                id,
                type,
                check,
                date,
                note,
                eventId,
                authorId,
                productId,
                quantity,
                buyer,
            } = await addRecord({ ...args });

            const author = await getUserByID(authorId);
            const product = productId ? await getProductById(productId) : null;
            const event = eventId ? await getEventById(eventId) : null;

            return {
                base: {
                    id,
                    type,
                    check,
                    date,
                    note,
                    event,
                    author,
                },
                product,
                quantity,
                buyer,
            };
        },
    },
    addPaymentRecord: {
        type: PaymentRecordType,
        args: {
            type: { type: new GraphQLNonNull(GraphQLString) },
            check: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            note: { type: GraphQLString },
            eventId: { type: GraphQLID },
            authorId: { type: new GraphQLNonNull(GraphQLID) },
            description: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            const {
                id,
                type,
                check,
                date,
                note,
                eventId,
                authorId,
                description,
            } = await addRecord({ ...args });

            const author = await getUserByID(authorId);
            const event = eventId ? await getEventById(eventId) : null;

            return {
                base: {
                    id,
                    type,
                    check,
                    date,
                    note,
                    event,
                    author,
                },
                description,
            };
        },
    },
};
