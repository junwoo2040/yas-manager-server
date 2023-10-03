import { Event } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllEvents = async () => {
    return await prisma.event.findMany({});
};

export const getEventById = async (id: string) => {
    return await prisma.event.findUnique({ where: { id: id } });
};

// Mutations
export const addEvent = async (newEvent: Event) => {
    return await prisma.event.create({
        data: {
            ...newEvent,
        },
    });
};
