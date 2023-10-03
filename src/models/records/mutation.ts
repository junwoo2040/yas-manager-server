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
import { RecordType } from "@prisma/client";
import { getUserByID } from "@models/user/database";
import { getEventById } from "@models/event/database";

export default {
    addDonationRecord: {
        type: DonationRecordType,
        args: {
            type: { type: new GraphQLNonNull(GraphQLString) },
            check: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            note: { type: GraphQLString },
            event: { type: GraphQLID },
            author: { type: new GraphQLNonNull(GraphQLID) },
            donor: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            const { id, type, check, date, note, eventId, authorId, donor } =
                await addRecord({ ...args });

            console.log(authorId);

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
            event: { type: GraphQLID },
            author: { type: new GraphQLNonNull(GraphQLID) },
            product: { type: new GraphQLNonNull(GraphQLID) },
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

            return await addRecord({ ...args });
        },
    },
    addPaymentRecord: {
        type: PaymentRecordType,
        args: {
            type: { type: new GraphQLNonNull(GraphQLString) },
            check: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLDate) },
            note: { type: GraphQLString },
            event: { type: GraphQLID },
            author: { type: new GraphQLNonNull(GraphQLID) },
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

            return {};
        },
    },
};
