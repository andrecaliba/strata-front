import * as z from 'zod';

const registrationSchema = z.object({
    email: z.email({ message: "Invalid email." }),
    firstName: z.string(),
    lastName: z.string(),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters."})
})

export default registrationSchema;