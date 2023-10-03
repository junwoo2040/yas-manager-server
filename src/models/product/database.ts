import { Product } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllProducts = async () => {
    return await prisma.product.findMany({});
};

export const getProductById = async (id: string) => {
    return await prisma.product.findUnique({ where: { id: id } });
};

// Mutations
export const addProduct = async (newProduct: Product) => {
    return await prisma.product.create({
        data: {
            ...newProduct,
        },
    });
};
