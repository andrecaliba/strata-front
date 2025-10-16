import * as z from 'zod';

const codeSchema = z.object({
    code: z.string()
    .min(6, { message: "One time code must be 6 characters long." })
    .max(6, { message: "One time code must be 6 characters long." })
})

export default codeSchema;