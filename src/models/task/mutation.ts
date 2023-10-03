import { GraphQLNonNull, GraphQLString } from "graphql";
import { TaskType } from "./typedef";
import { addTask, getAllTasks } from "./database";

export default {
    addTask: {
        type: TaskType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            eventId: { type: GraphQLString },
        },
        resolve: async (src: any, args: any) => {
            return await addTask({
                ...args,
            });
        },
    },
};
