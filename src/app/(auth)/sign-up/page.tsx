"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/schemas/signUpSchema';
import Link from "next/link";

export default function SignUpForm() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit=async ()=>{
        try {
            await form.handleSubmit(onSubmit);
            
        } catch (error) {
            // error logic
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
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
                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C16.9765 3.0265 14.6115 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#4285F4"
            />
            <path
                d="M3.15503 7.3455L6.6645 10.2039C7.7105 8.0865 9.6255 6.5 12 6.5C13.4825 6.5 14.8395 7.0265 15.9805 7.9805L18.7455 5.1455C16.9765 3.5115 14.6115 2.5 12 2.5C7.9025 2.5 4.4455 5.1865 3.15503 7.3455Z"
                fill="#EA4335"
            />
            <path
                d="M12 21.5C14.6225 21.5 16.9805 20.4855 18.7455 18.8545L15.1305 15.5395C14.0795 16.4095 13.0625 16.9 12 16.9C9.6255 16.9 7.7105 15.3115 6.6685 13.1925L3.1865 16.1115C4.4825 18.5115 7.9025 21.5 12 21.5Z"
                fill="#34A853"
            />
            <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C17.1615 15.2215 16.1165 16.1925 14.8255 16.7115L18.7455 18.8545C18.1305 19.321 21 17 21 12C21 11.3295 21.031 10.675 21.8055 10.0415Z"
                fill="#FBBC05"
            />
        </svg>
    );
};
