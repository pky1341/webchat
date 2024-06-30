import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpForm() {
    return (
        <div className="mx-auto max-w-[400px] space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Create your account to get started.</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@email.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
                <div className="flex items-center justify-center space-x-2">
                    <span className="h-[1px] w-full bg-muted" />
                    <span className="text-muted-foreground">or</span>
                    <span className="h-[1px] w-full bg-muted" />
                </div>
                <Button variant="outline" className="w-full">
                    <ChromeIcon className="mr-2 h-5 w-5" />
                    Sign up with Google
                </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="#" className="font-medium underline underline-offset-4" prefetch={false}>
                    Sign in
                </Link>
            </div>
        </div>
    )
}

function ChromeIcon(props: React.SVGAttributes<SVGSVGElement>) {
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" x2="12" y1="8" y2="8" />
            <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
            <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    )
}