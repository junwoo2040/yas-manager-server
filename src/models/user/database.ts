import { Role, User } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllUsers = async () => {
    return await prisma.user.findMany({});
};

export const getUsersByRole = async (role: Role) => {
    return await prisma.user.findMany({ where: { role: role } });
};

export const getUserByID = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });
};

export const getUsersByUsername = async (username: string) => {
    return await prisma.user.findMany({ where: { username } });
};

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

// Mutations
export const addUser = async (newUser: User) => {
    return await prisma.user.create({
        data: {
            ...newUser,
        },
    });
};

export const deleteUserByUUID = async (uuid: string) => {
    await prisma.user.delete({ where: { id: uuid } });
};

export const deleteUserByEmail = async (email: string) => {
    await prisma.user.delete({ where: { email: email } });
};
