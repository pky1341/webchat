'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { otpSchema } from "@/schemas/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const {register,handleSubmit,formState:{error}}=useForm({
    resolver:zodResolver(otpSchema),
    defaultValues:{email}
});
export const OTPForm = () => {
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    return (
        <>
            <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <Card className="w-full max-w-md bg-muted dark:bg-gray-800 shadow-lg">
                    <div className="max-h-fit overflow-y-auto">
                        <CardHeader>
                            <CardTitle className="text-gray-800 dark:text-gray-100">Verify OTP</CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Enter the OTP code sent to your email.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">Enter OTP</Label>
                                    <InputOTP maxLength={4} pattern="^[0-9]+$" className="text-center">
                                        <InputOTPGroup className="gap-4">
                                            <InputOTPSlot index={0} className="w-12 h-12 text-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                                            <InputOTPSlot index={1} className="w-12 h-12 text-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="gap-4">
                                            <InputOTPSlot index={2} className="w-12 h-12 text-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                                            <InputOTPSlot index={3} className="w-12 h-12 text-2xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    Verify OTP
                                </Button>
                                <p className="text-gray-600 dark:text-gray-400">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
                                <Button onClick={handleResendOTP} className="w-full" disabled={timeLeft > 0}>
                                    Resend OTP
                                </Button>
                            </form>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </>
    );
}