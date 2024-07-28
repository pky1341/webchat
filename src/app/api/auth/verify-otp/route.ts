import mongoDB from "@/lib/mongoDB";
import { otpSchema } from "@/schemas/otpSchema";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/model/User";
import { z } from "zod";
import { verifyOTP } from '@/lib/otpService';
import redisClient from "@/lib/redis";
import { verifyAccessToken, generateAccessToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
    try {
        await mongoDB();
        const body = await request.json();
        try {
            const { email, otp } = await otpSchema.parse(body);
            const userData= await redisClient.get(`user:${email}`);
            if (!userData) {
                return NextResponse.json({ message: "Registration session expired" }, { status: 400 });
            }
            const {username,password} = JSON.parse(userData);
            const {isValid,message} = await verifyOTP(email, otp);
            if (!isValid) {
                return NextResponse.json({ success: false, message }, { status: 400 });
            }

            await UserModel.create({
                username,
                email,
                password,
                isVerified: true,
            });
            await redisClient.del(`user:${email}`);
            return NextResponse.json({ success: true, message: "Email verified successfully" }, { status: 200 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ error: error.errors }, { status: 400 });
            }
            throw error;
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
