import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

export const ProductType: GraphQLObjectType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        stock: { type: new GraphQLNonNull(GraphQLInt) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
    }),
});
