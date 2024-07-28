"use client";
import React, { useState, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
import { ErrorMessage } from "@/utils/errAni";
import {AnimatePresence} from 'framer-motion';

interface SignUpProps {
    email: string;
    password: string;
}
export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof signUpSchema>>(
        {
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                email: "",
                password: "",
            }
        }
    );
    const handleError = (field: 'email' | 'password', message: string) => {
        setError(field, { type: 'manual', message });
        toast.error(message);
    }
    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const msg = await response.json();
            if (response?.ok) {
                toast.success(msg.message);
                router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
            } else {
                if (msg.field) {
                    handleError(msg.field, msg.message);
                } else {
                    toast.error(msg.message);
                }

            }
        } catch (error) {
            toast.error(`signup is failed ${error}`);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <Card className="w-full max-w-md bg-muted dark:bg-gray-800 shadow-lg">
                <div className="max-h-fit overflow-y-auto">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-gray-100">Sign Up</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Enter your email and password to create an account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                <Input id="email" type="email" placeholder="Enter Email" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    {...register('email')}
                                />
                                <AnimatePresence>
                                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                                </AnimatePresence>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                                <Input id="password" type="password" placeholder="Enter Password" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    {...register('password')}
                                />
                                <AnimatePresence>
                                    {errors.password && <ErrorMessage message={errors.password.message!} />}
                                </AnimatePresence>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}> {loading ? (<Oval
                                height="28"
                                width="28"
                                color="#017BBE"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />) : ('Sign Up')}
                            </Button>
                        </form>
                        <Separator className="my-4" />
                        <Button type="button" variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => toast.info("Google Sign Up is not implemented yet.")}
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Sign up with Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <a href="#" className="text-blue-600 hover:underline">Log in</a>
                        </p>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}