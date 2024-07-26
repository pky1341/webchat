import mongoDB from "@/lib/mongoDB";
import OTPModel from "@/model/OTP";
import { otpSchema } from "@/schemas/otpSchema";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/model/User";
import { z } from "zod";
import { verifyOTP } from '@/lib/otpService';
import redisClient from "@/lib/redis";

export async function POST(request: NextRequest) {
    try {
        await mongoDB();
        const body = await request.json();
        try {
            const { email, otp } = await otpSchema.parse(body);

            const isValid = await verifyOTP(email, otp);
            if (!isValid) {
                return NextResponse.json({ error: "OTP is Expired please send again" }, { status: 400 });
            }
            const userData= await redisClient.get(`user:${email}`);
            if (!userData) {
                return NextResponse.json({ error: "Registration session expired" }, { status: 400 });
            }
            const {username,password} = JSON.parse(userData);

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
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
