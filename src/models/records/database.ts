import { Record } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllRecords = async () => {
    return await prisma.record.findMany({});
};

export const getRecordById = async (id: string) => {
    return await prisma.record.findUnique({ where: { id: id } });
};

// Mutations
export const addRecord = async (newRecord: Record) => {
    return await prisma.record.create({
        data: {
            type: newRecord.type,
            check: newRecord.check,
            date: newRecord.date,
            note: newRecord.note,
            event: newRecord.eventId
                ? {
                      connect: {
                          id: newRecord.eventId,
                      },
                  }
                : undefined,
            author: {
                connect: {
                    id: newRecord.authorId,
                },
            },
            donor: newRecord.donor,
            product: newRecord.productId
                ? {
                      connect: {
                          id: newRecord.productId,
                      },
                  }
                : undefined,
            quantity: newRecord.quantity,
            buyer: newRecord.buyer,
            description: newRecord.description,
        },
        include: {
            event: newRecord.eventId !== undefined,
            author: true,
            product: newRecord.productId !== undefined,
        },
    });
};
