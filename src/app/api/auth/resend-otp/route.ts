import { generateNumericOTP } from "@/helper/generateOtp";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import mongoDB from "@/lib/mongoDB";
import { rateLimit } from "@/lib/rateLimit";
import OTPModel from "@/model/OTP";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOTP } from '@/lib/otpService';
import redisClient from "@/lib/redis";

const resendOTPSchema = z.object({
    email: z.string().email("Invalid email address"),
});
export async function POST(request: NextRequest) {
    try {
        await mongoDB();
        const limiter = await rateLimit({
            interval: 60 * 1000,
            uniqueTokenPerInterval: 500,
        });
        await limiter.check(5, "RESEND_OTP_RATE_LIMIT" as any);

        const body = await request.json();
        const { email } = resendOTPSchema.parse(body);

        const userData = await redisClient.get(`user:${email}`);
        if (!userData) {
            return NextResponse.json({ error: "No pending registration found for this email" }, { status: 400 });
        }

        const otpCode = await generateOTP(email);
        const {username} = JSON.parse(userData);
        await sendVerificationEmail(email, otpCode, username);

        return NextResponse.json(
            {
                success: true,
                message: "New verification code has been sent to your email",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Error in resending OTP:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
