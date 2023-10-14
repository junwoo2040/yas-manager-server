import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { RecordType } from "./typedef";
import { getAllRecords, getRecordById } from "./database";

import { getEventById } from "@models/event/database";
import { getUserByID } from "@models/user/database";
import { getProductById } from "@models/product/database";

export default {
    record: {
        //type: [DonationRecordType, SaleRecordType, PayementRecordType],
        type: RecordType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            const record = await getRecordById(args.id);

            if (!record) return;

            const {
                id,
                type,
                check,
                date,
                note,
                eventId,
                authorId,
                donor,
                productId,
                quantity,
                buyer,
                description,
            } = record;

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
                donor,
                product,
                quantity,
                buyer,
                description,
            };
        },
    },
    records: {
        /*
        type: [
            new GraphQLList(DonationRecordType),
            new GraphQLList(SaleRecordType),
            new GraphQLList(PayementRecordType),
        ],
        */
        type: new GraphQLList(RecordType),
        resolve: async (src: any, args: any) => {
            const records = await getAllRecords();

            return records.map(
                async ({
                    id,
                    type,
                    check,
                    date,
                    note,
                    eventId,
                    authorId,
                    donor,
                    productId,
                    quantity,
                    buyer,
                    description,
                }) => {
                    const author = await getUserByID(authorId);
                    const product = productId
                        ? await getProductById(productId)
                        : null;
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
                        product,
                        quantity,
                        buyer,
                        description,
                    };
                },
            );
        },
    },
};
