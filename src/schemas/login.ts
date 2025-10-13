import * as z from 'zod';

const loginSchema = z.object({
    email: z.email({ message: "Invalid email." }),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters."})
})

export default loginSchema;