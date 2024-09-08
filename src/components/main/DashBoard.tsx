"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
    _id:string;
    name: string;
}
interface DashBoardProps {
    props: User[];
}

export default function DashBoard() {
    const router = useRouter();
    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await signOut({ redirect: false });
        router.push("/sign-in");
        toast.info('you logged Out from the panel');
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <aside className="w-1/4 bg-gray-800 flex flex-col">
                <header className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                    <h1 className="text-lg font-bold">Chats</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                                <AvatarFallback>JP</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                    <div className="h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                    <div className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="#" onClick={handleLogout} className="flex items-center gap-2" prefetch={false}>
                                    <div className="h-4 w-4" />
                                    <span>Sign out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <div className="p-4">
                    <Input type="search" placeholder="Search" className="w-full bg-gray-700 text-white placeholder-gray-400" />
                </div>

                <div className="flex-1 overflow-y-auto">
                        <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-700">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 ml-4">
                                <div className="flex justify-between">
                                    <h2 className="font-bold">Unknown User</h2>
                                    <span className="text-sm text-gray-400">Yesterday</span>
                                </div>
                                <p className="text-sm text-gray-400">Last message preview...</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center h-full">
                            <p>No users found.</p>
                        </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center">
                    <LaptopIcon className="h-32 w-32 mb-4" />
                    <h2 className="text-2xl font-bold">WhatsApp Web</h2>
                    <p className="text-gray-400 mt-2">
                        Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1
                        phone at the same time.
                    </p>
                </div>
            </main>
        </div>
    )
}

function LaptopIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
        </svg>
    )
}


function OptionIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3h6l6 18h6" />
            <path d="M14 3h7" />
        </svg>
    )
}