import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    if (path == "/verify-otp") {
        const token = request.cookies.get("auth_token")?.value;
        const isVerifying = request.cookies.get("is_verifying")?.value === "true";
        if (token && isVerifying) {
            return NextResponse.next();
        }
        if (token && !isVerifying) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        
        return NextResponse.redirect(new URL("/sign-up", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/verify-otp"],
};
