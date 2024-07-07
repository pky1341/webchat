"use client";
import React, { useState,FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
interface SignUpProps {
    email: string;
    password: string;
    otp: string;
}
export default function SignUpForm() {
    const [step, setStep] = useState(1);
    const { register, handleSubmit } = useForm<z.infer<typeof signUpSchema>>(
        {
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                email: "",
                password: "",
                otp: ""
            }
        }
    );
    const onSubmit = (data: z.infer<typeof signUpSchema>) => {
        console.log(data)
        setStep(2)
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <Card className="w-full max-w-md bg-muted dark:bg-gray-800 shadow-lg">
                <div className="max-h-fit overflow-y-auto">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-gray-100">Sign Up</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            {step === 1
                                ? "Enter your email and password to create an account."
                                : "Enter the OTP code sent to your email."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {step === 1 ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                        <Input id="email" type="email" placeholder="m@example.com" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                                        <Input id="password" type="password" placeholder="Password" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
                                    </div>
                                </>
                            ) : (
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
                                </div>
                            )}
                            <Button type="submit" className="w-full">
                                {step === 1 ? "Sign Up" : "Verify OTP"}
                            </Button>
                        </form>
                        {step === 1 && (
                            <>
                                <Separator className="my-4" />
                                <Button type="button" variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <FcGoogle className="w-5 h-5 mr-2" />
                                    Sign up with Google
                                </Button>
                            </>)}
                    </CardContent>
                    {step === 1 && (<>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <a href="#" className="text-blue-600 hover:underline">Log in</a>
                            </p>
                        </CardFooter>
                    </>)}
                </div>
            </Card>
        </div>
    )
}