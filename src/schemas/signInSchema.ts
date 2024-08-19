import { z } from "zod";
export const signInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).min(1, { message: 'This is required' }),
    password: z.string().trim().min(1,'please enter a valid password'),
});