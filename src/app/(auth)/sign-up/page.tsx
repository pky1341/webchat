"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/signUpSchema";
import Link from "next/link";
import { z } from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2Icon } from "@/components/ui/icon";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export default function SignUpForm() {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [isOTPSubmitting, setIsOTPSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            setIsOTPSubmitting(true);
            const res = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setIsOTPSubmitting(false);
            // const json = await res.json();
            console.log(res);
        } catch (error) {
            setIsOTPSubmitting(false);
            console.error(error);
        }
    };

    return (
        <div className="container flex h-screen justify-center items-center">
            <div className="mx-auto max-w-[400px] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-muted-foreground">
                        Enter your email and password to create an account.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input id="password" type="password" placeholder="Enter Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="otp">Enter OTP</FormLabel>
                                    <FormControl>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0}>
                                                <InputOTP {...field} />
                                            </InputOTPSlot>
                                            <InputOTPSeparator>-</InputOTPSeparator>
                                            <InputOTPSlot index={1}>
                                                <InputOTP {...field} />
                                            </InputOTPSlot >
                                            <InputOTPSeparator>-</InputOTPSeparator>
                                            <InputOTPSlot index={2}>
                                                <InputOTP {...field} />
                                            </InputOTPSlot>
                                            <InputOTPSeparator>-</InputOTPSeparator>
                                            <InputOTPSlot index={3}>
                                                <InputOTP {...field} />
                                            </InputOTPSlot>
                                        </InputOTPGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isOTPSubmitting}>
                            {isOTPSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting OTP
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                        <Button variant="outline" className="w-full">
                            <GoogleIcon className="mr-2 h-4 w-4" />
                            Sign up with Google
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="#" className="underline" prefetch={false}>
                                Log in
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

const GoogleIcon = (props: React.SVGAttributes<SVGSVGElement>) => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21 10H12V14H17.6C16.8 16.4 14.5 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C13.5 6 14.9 6.6 15.9 7.5L18.8 4.7C16.9 3 14.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 11.3 21.9 10.7 21 10Z"
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
