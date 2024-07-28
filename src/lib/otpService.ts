import crypto from 'crypto';
import redisClient from "./redis";

const OTP_LENGTH = 4;
const OTP_EXPIRY = 90;
const MAX_ATTEMPTS = 3;

export async function generateOTP(email: string): Promise<string> {
    const otp = crypto.randomInt(1000, 9999).toString().padStart(OTP_LENGTH, '0');
    await redisClient.set(`otp:${email}`, JSON.stringify({
        otp,
        attempts: 0
    }), {
        EX: OTP_EXPIRY
    });
    return otp;
}

export async function verifyOTP(email: string, otp: string): Promise<{ isValid: boolean; message: string }> {
    const storedData = await redisClient.get(`otp:${email}`);
    if (!storedData) return { isValid: false, message: "OTP has expired or does not exist" };

    const { otp: storedOTP, attempts } = JSON.parse(storedData)
    if (attempts >= MAX_ATTEMPTS) {
        await redisClient.del(`otp:${email}`);
        return { isValid: false, message: "Maximum attempts reached. Please request a new OTP" };
    }
    const isValid = storedOTP === otp;
    if (isValid) {
        await redisClient.del(`otp:${email}`);
        return { isValid: true, message: "OTP verified successfully" };
    } else {
        await redisClient.set(`otp:${email}`, JSON.stringify({ otp: storedOTP, attempts: attempts + 1 }), {
            EX: OTP_EXPIRY
        });
        const remainingAttempts = MAX_ATTEMPTS - (attempts + 1);
        return { isValid: false, message: `Invalid OTP. ${remainingAttempts} attempts remaining` };
    }
}