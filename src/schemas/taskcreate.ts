import * as z from 'zod';

const createTaskSchema = z.object({
    taskTitle: z.string(),
    dueDateAndTime: z.iso.datetime({ offset: true }),
    description: z.string(),
    difficulty: z.string(),
    manager: z.string(),
    assignees: z.array(z.string())
})

export default createTaskSchema;