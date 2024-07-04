import { Resend } from "resend";
import { sendVerification } from "@/components/mails/sendVerification";

export async function sendVerificationEmail(email: string, otpCode: string, username: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailFrom = process.env.EMAIL_FROM;
    if (!resend || !emailFrom) {
        console.error('Missing Resend API key or email from address');
        return;
    }
    try {
        await resend.emails.send({
            from: emailFrom,
            to: email,
            subject: "webchat User Verification Email",
            react: sendVerification({ otp: otpCode, user: username })
        });
        return { success: true, message: "email sent successfully" }
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email.' };
    }
}