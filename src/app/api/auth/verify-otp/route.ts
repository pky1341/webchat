import mongoDB from "@/lib/mongoDB";
import OTPModel from "@/model/OTP";
import { otpSchema } from "@/schemas/otpSchema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/model/User";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        await mongoDB();
        const body = await request.json();
        try {
            const { email, otp } = await otpSchema.parse(body);

            const checkEmailOtp = await OTPModel.findOne({ email });
            if (!checkEmailOtp) {
                return NextResponse.json(
                    { error: "OTP not found or expired" },
                    { status: 400 }
                );
            }
            if (checkEmailOtp.otp !== otp) {
                return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(checkEmailOtp.password, 12);
            const userName = await email.split("@")[0];

            // await UserModel.create({
            //     username: userName,
            //     email,
            //     password: hashedPassword,
            //     isVerified: true,
            // });
            await UserModel.findOneAndUpdate(
                { email },
                {
                    username: userName,
                    email,
                    password: hashedPassword,
                    isVerified: true,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            await OTPModel.findOneAndDelete({ email });
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
