import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import mongoDB from "@/lib/mongoDB";
import { rateLimit } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOTP } from '@/lib/otpService';
import redisClient from "@/lib/redis";
import { verifyAccessToken } from "@/lib/auth/jwt";

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
        const token = request.cookies.get('auth_token')?.value;
        const isVerifying = request.cookies.get('is_verifying')?.value === 'true';
        if (!token || !isVerifying) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decodedToken = verifyAccessToken(token);

        if (!decodedToken) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
        const body = await request.json();
        const { email } = resendOTPSchema.parse(body);
        const userData = await redisClient.get(`user:${email}`);
        if (!userData) {
            return NextResponse.json({ message: "No pending registration found for this email" }, { status: 400 });
        }

        const otpCode = await generateOTP(email);
        const { username } = JSON.parse(userData);
        await sendVerificationEmail(email, otpCode, username);

        const response = NextResponse.json(
            {
                success: true,
                message: "New verification code has been sent to your email",
            },
            { status: 200 }
        );
        response.cookies.set('is_verifying', 'true', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600
        })
        return response;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
