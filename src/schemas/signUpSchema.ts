import { z } from "zod";
export const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(15, { message: "password should be maximum charecters 15 characters" }),
});