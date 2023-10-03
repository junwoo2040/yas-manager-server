import { Task, TaskStatus } from "@prisma/client";
import { prisma } from "@utils/index";

// Queries
export const getAllTasks = async () => {
    return await prisma.task.findMany({});
};

export const getTaskByID = async (id: string) => {
    return await prisma.task.findUnique({ where: { id } });
};

// Mutations
export const addTask = async (newTask: Task) => {
    return await prisma.task.create({
        data: {
            ...newTask,
            description: "Task Description",
            status: TaskStatus.TODO,
        },
    });
};
