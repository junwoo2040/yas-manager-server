import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ProductType } from "./typedef";
import { getAllProducts, getProductById } from "./database";

export default {
    product: {
        type: ProductType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getProductById(args.id);
        },
    },
    products: {
        type: new GraphQLList(ProductType),
        resolve: async (src: any, args: any) => {
            return await getAllProducts();
        },
    },
};
