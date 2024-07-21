import {z} from 'zod';
export const otpSchema={
    otp:z.string().length(4,'otp must be at least 4 digit')
}