import mongoDB from "@/lib/mongoDB";
import UserModel from "@/model/User";
import OTPModel from "@/model/OTP";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { generateNumericOTP } from "@/helper/generateOtp";
import { rateLimit } from "@/lib/rateLimit";
import { signUpSchema } from "@/schemas/signUpSchema";
import { generateOTP } from '@/lib/otpService';

export async function POST(request: Request) {
    // try {
        await mongoDB();
        const limiter = await rateLimit({
            interval: 60 * 1000,
            uniqueTokenPerInterval: 500,
        });
        await limiter.check(10, "SIGNUP_RATE_LIMIT" as any);
        const { email, password } = await request.json();
        // try {
            // const { email, password } = signUpSchema.parse(body);
            const checkUser = await UserModel.findOne({
                email,
            });
            if (checkUser) {
                return Response.json(
                    { error: "Email already exists" },
                    { status: 400 }
                );
            }

            const otpCode = await generateOTP(email);
            // const otpCode =await generateNumericOTP(4);
            const userName = email.split("@")[0];
            await OTPModel.findOneAndUpdate(
                { email },
                { otp: otpCode, password },
                { new: true, upsert: true, runValidators: true }
            );
            await sendVerificationEmail(email, otpCode, userName);
            return Response.json(
                {
                    success: true,
                    message: "Verification code has been sent to your email",
                },
                {
                    status: 200,
                }
            );
    //     } catch (error) {
    //         return Response.json({ error: "Invalid input data" }, { status: 400 });
    //     }
    // } catch (error) {
    //     return Response.json({ error: "Internal server error" }, { status: 500 });
    // }
}
