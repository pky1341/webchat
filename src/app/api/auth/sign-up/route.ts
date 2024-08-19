import mongoDB from "@/lib/mongoDB";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { rateLimit } from "@/lib/rateLimit";
import { signUpSchema } from "@/schemas/signUpSchema";
import { generateOTP } from '@/lib/otpService';
import redisClient from "@/lib/redis";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { generateAccessToken } from '@/lib/auth/jwt';
import UserModel from "@/model/User";

export async function POST(request: Request) {
    try {
        await mongoDB();
        const limiter = await rateLimit({
            interval: 60 * 1000,
            uniqueTokenPerInterval: 500,
        });
        await limiter.check(10, "SIGNUP_RATE_LIMIT" as any);
        const { email, password } = await request.json();
        try {
            const existingUserData = await redisClient.get(`user:${email}`);
            if (existingUserData) {
                return NextResponse.json({ message: "User already exist" }, { status: 400 });
            }
            const userExist = await UserModel.findOne({email:email});
            if (userExist) {
                return NextResponse.json({ message: "User already exist" }, { status: 400 });
            }
            const otpCode = await generateOTP(email);
            const hashedPassword = await bcrypt.hash(password, 12);
            const userName = email.split("@")[0];
            
            await redisClient.set(`user:${email}`, JSON.stringify({
                username: userName,
                email,
                password: hashedPassword,
            }));
            await sendVerificationEmail(email, otpCode, userName);
            const token =await generateAccessToken(email);
            const response = NextResponse.json(
                {
                    success: true,
                    message: "Verification code has been sent to your email",
                },
                {
                    status: 200,
                }
            );
            response.cookies.set('auth_token', token, { httpOnly: true, secure: true,sameSite: 'strict' });
            response.cookies.set('is_verifying', 'true', { httpOnly: true, secure: true,sameSite: 'strict' });
            return response;
        } catch (error) {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}