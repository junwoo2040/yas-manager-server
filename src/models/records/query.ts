import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { RecordType } from "./typedef";
import { getAllRecords, getRecordById } from "./database";

export default {
    record: {
        //type: [DonationRecordType, SaleRecordType, PayementRecordType],
        type: RecordType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getRecordById(args.id);
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
            return await getAllRecords();
        },
    },
};
