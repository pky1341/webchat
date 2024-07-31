import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path === '/verify-otp') {
        const token = request.cookies.get("auth_token")?.value;
        const isVerifying = request.cookies.get("is_verifying")?.value === "true";
        if (!token) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }
        const decodedToken = verifyAccessToken(token);
        if (!decodedToken) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }
        if (token && isVerifying) {
            return NextResponse.next();
        }
        if (token && !isVerifying) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/sign-up", request.url));
    }
    if (path === '/dashboard') {
        const token = request.cookies.get("auth_token")?.value;
        const isVerifying = request.cookies.get("is_verifying")?.value === "true";
        if (!token) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }
        const decodedToken = verifyAccessToken(token);
        if (!decodedToken) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }
        if (token && !isVerifying) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/verify-otp', '/dashboard'],
};
