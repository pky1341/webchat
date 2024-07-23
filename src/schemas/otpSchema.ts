import {z} from 'zod';
export const otpSchema=z.object({
    email:z.string().email('Invalid email address'),
    otp:z.string().length(4,'OTP must be exactly 4 digits').regex(/^\d+$/,'OTP must contain only digits')
});
export type OTPInput =z.infer<typeof otpSchema>;