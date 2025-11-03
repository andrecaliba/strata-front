import * as z from "zod";

// const createTaskSchema = z.object({
//     taskTitle: z.string(),
//     dueDateAndTime: z.iso.datetime({ offset: true }),
//     description: z.string(),
//     difficulty: z.string(),
//     manager: z.string(),
//     assignees: z.array(z.string())
// })

const createTaskSchema = z.object({
  taskTitle: z.string().min(1, { message: "Task title is required." }),
  dueDateAndTime: z
    .string()
    .min(1, { message: "Due date and time is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  difficulty: z.enum(["Easy", "Moderate", "Hard"], {
    message: "Please select a difficulty level.",
  }),
  manager: z.string().optional(),
  assignees: z
    .array(z.string())
    .min(1, { message: "At least one assignee is required." }),
  subtasks: z
    .array(
      z.object({
        subtaskTitle: z
          .string()
          .min(1, { message: "Subtask title is required." }),
      })
    )
});

export default createTaskSchema;
