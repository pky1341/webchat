
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Component() {
    return (
        <div className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <MessageSquareIcon className="h-6 w-6" />
                            <span className="">Messages</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <SearchIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle search</span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                Messages
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">5</Badge>
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                Support
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                Billing
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                Feedback
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle>Need help?</CardTitle>
                                <CardDescription>Contact our support team for assistance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" className="w-full">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link href="#" className="lg:hidden" prefetch={false}>
                        <MessageSquareIcon className="h-6 w-6" />
                        <span className="sr-only">Messages</span>
                    </Link>
                    <h1 className="font-semibold text-lg md:text-2xl">Messages</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="border shadow-sm rounded-lg">
                        <div className="grid h-[400px] items-start p-4 gap-4 text-sm font-medium md:text-base lg:text-sm">
                            <div className="grid gap-4">
                                <div className="flex items-start">
                                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">Hi there! How can I help you today?</div>
                                </div>
                                <div className="flex items-start ml-auto">
                                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                                        I`m having trouble with my account. Can you help me?
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                                        Sure! I can help you with that. Let me check your account.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto flex items-center gap-4">
                        <Input type="text" placeholder="Type your message..." className="w-full max-w-[600px] shadow-none" />
                        <Button className="h-[50px]">Send</Button>
                    </div>
                </main>
            </div>
        </div>
    )
}

function MessageSquareIcon(props:React.SVGAttributes<SVGSVGElement>) {
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}


function SearchIcon(props:React.SVGAttributes<SVGSVGElement>) {
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function XIcon(props:React.SVGAttributes<SVGSVGElement>) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}