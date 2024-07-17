import { Resend } from "resend";
import { sendVerification } from "@/components/mails/sendVerification";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendVerificationEmail(email: string, otpCode: string, username: string) {
    
    const emailFrom = process.env.EMAIL_FROM;
    const testRecipient=process.env.TEST_RECIPIENT_EMAIL;
    if (!resend || !emailFrom || !testRecipient) {
        console.error('Missing Resend API key or email from address');
        return;
    }
    try {
        const { data, error } = await resend.emails.send({
            from: emailFrom,
            to: testRecipient,
            subject: "webchat User Verification Email",
            react: sendVerification({ otp: otpCode, user: username })
        });
        if (error) {
            console.error('Error sending verification email:', error);
            return { success: false, message: 'Failed to send verification email.' };
        }
        console.log('Email sent successfully:', data);
        return { success: true, message: "email sent successfully" }
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email.' };
    }
}