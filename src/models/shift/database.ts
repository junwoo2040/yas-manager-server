import { Shift } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllShifts = async () => {
    return await prisma.shift.findMany({});
};

export const getShiftById = async (id: string) => {
    return await prisma.shift.findUnique({ where: { id: id } });
};

// Mutations
export const addShift = async (newShift: Shift) => {
    return await prisma.shift.create({
        data: {
            ...newShift,
        },
    });
};
