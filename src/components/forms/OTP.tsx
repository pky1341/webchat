'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { otpSchema } from "@/schemas/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation';
import { Oval, ThreeDots } from "react-loader-spinner";
import { ErrorMessage } from "@/utils/errAni";
import { AnimatePresence } from 'framer-motion';
import { z } from "zod";
import { toast } from "sonner";
import Cookies from 'js-cookie';

type otpFormData = z.infer<typeof otpSchema>;

export const OTPForm = () => {
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [showError, setShowError] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm<otpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email: email || '',
            otp: ''
        }
    });
    const otpValue = watch('otp');
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showError]);

    const onSubmit = async (data: otpFormData) => {
        console.log(data);
        setShowError(true);
        if (errors.otp) return;
        setVerifyLoading(true);
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/type' },
                body: JSON.stringify(data)
            });
            const msg = await response.json();
            if (response?.ok) {
                toast.success(msg.message);
                router.push('/dashboard');
            } else {
                toast.error(msg.message);
            }
        } catch (error) {
            toast.error('An error occurred while verifying OTP');
        } finally {
            setVerifyLoading(false);
        }
    }

    const handleResendOTP = async () => {
        setResendLoading(true);
        if (!email) {
            toast.warning('Email not found. Please try signing up again.');
            Cookies.remove("is_verifying");
            setResendLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const msg = await response.json();
            if (response?.ok) {
                setTimeLeft(90);
                toast.success(msg.message);
            } else {
                toast.error(msg.message);
            }
        } catch (error) {
            toast.error('An error occurred while resending OTP');
        } finally {
            setResendLoading(false);
        }
    }

    const handleOTPChange = (value: string) => {
        setValue('otp', value, { shouldValidate: false });
        setShowError(false);
    }

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
                                    <InputOTP maxLength={4} pattern="^[0-9]+$" className="text-center" value={otpValue} onChange={handleOTPChange} >
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
                                    <AnimatePresence>
                                        {showError && errors.otp && (<ErrorMessage message={errors.otp.message!} />)}
                                    </AnimatePresence>
                                </div>
                                <Button type="submit" className="w-full" disabled={verifyLoading || otpValue.length !== 4}>
                                    {verifyLoading ? (
                                        <Oval
                                            visible={true}
                                            height={28}
                                            width={28}
                                            color="#017BBE"
                                            ariaLabel="oval-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </Button>
                                <div className="flex justify-between items-center p-4">
                                    <Button
                                        variant="link"
                                        onClick={handleResendOTP}
                                        disabled={timeLeft > 0 || resendLoading}
                                        className={`text-blue-500 hover:text-blue-700 ${(timeLeft > 0 || resendLoading) ? 'text-gray-400' : ''}`}
                                    >
                                        {resendLoading ? (
                                            <>
                                                <span>Resending</span>
                                                <ThreeDots
                                                    visible={true}
                                                    height={30}
                                                    width={30}
                                                    color="#017BBE"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                />
                                            </>
                                        ) : 'Resend OTP'}
                                    </Button>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        {timeLeft > 0 ? (
                                            <>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</>
                                        ) : (
                                            <>00:00</>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </>
    );
}