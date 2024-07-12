import mongoDB from "@/lib/mongoDB";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { generateNumericOTP } from "@/helper/generateOtp";
import { rateLimit } from '@/lib/rateLimit';
import { signUpSchema } from "@/schemas/signUpSchema";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        await mongoDB();
        const limiter= await rateLimit({
            interval:60*1000,
            uninqueTokenPerInterval:500
        });
        const { email, password } = await request.json();

        const checkUser = await UserModel.findOne({
            email
        });

        if (checkUser) {
            return Response.json(
                {
                    success: false,
                    message: "email is already taken"
                },
                {
                    status: 400
                }
            );
        }
        const otpCode = generateNumericOTP(4);
        const userName = email.split('@')[0];
        const emailRes = await sendVerificationEmail(email, otpCode, userName);
        return Response.json({
            data: emailRes,
            success: true,
            message: "Verification code has been sent to your email"
        }, {
            status: 200
        })
    } catch (error) {

    }

    // if (emailRes?.success) {

    // }
}