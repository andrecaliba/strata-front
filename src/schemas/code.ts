import * as z from 'zod';

const codeSchema = z.object({
    code: z.string()
    .min(7, { message: "One time code must be 7 characters long." })
    .max(7, { message: "One time code must be 7 characters long." })
})

export default codeSchema;