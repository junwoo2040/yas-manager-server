import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { ProductType } from "./typedef";
import { addProduct } from "./database";

export default {
    addProduct: {
        type: ProductType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            stock: { type: new GraphQLNonNull(GraphQLInt) },
            currency: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (src: any, args: any) => {
            return await addProduct({
                ...args,
            });
        },
    },
};
