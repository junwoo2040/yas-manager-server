import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { TaskType } from "./typedef";
import { getAllTasks, getTaskByID } from "./database";

export default {
    task: {
        type: TaskType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: async (src: any, args: any) => {
            return await getTaskByID(args.id);
        },
    },
    tasks: {
        type: new GraphQLList(TaskType),
        resolve: async (src: any, args: any) => {
            return await getAllTasks();
        },
    },
};
