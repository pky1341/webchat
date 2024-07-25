import crypto from 'crypto';
import redisClient from "./redis";

const OTP_LENGTH = 4;
const OTP_EXPIRY = 90;

export async function generateOTP(email: string): Promise<string> {
    const otp = crypto.randomInt(1000, 9999).toString().padStart(OTP_LENGTH, '0');
    await redisClient.set(`otp:${email}`, otp, {
        EX: OTP_EXPIRY
    }); 
    return otp;
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP  = await redisClient.get(`otp:${email}`);
    if (!storedOTP ) return false;

    const isValid =storedOTP===otp;
    if (!isValid) {
        await redisClient.del(`otp:${email}`);
    }
    return isValid;
}