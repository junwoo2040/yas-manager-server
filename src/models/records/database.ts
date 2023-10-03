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
            ...newRecord,
            authorId: newRecord.authorId,
        },
    });
};
