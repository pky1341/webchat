import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("auth_token")?.value;
    const isVerifying = request.cookies.get("is_verifying")?.value === "true";
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (path === '/verify-otp' || path === '/dashboard') {

        if (!token) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }

        const decodedToken = verifyAccessToken(token);
        if (!decodedToken) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }

        if (path === '/verify-otp' && isVerifying) {
            return NextResponse.next();
        }

        if (path === '/dashboard' && !isVerifying) {
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/verify-otp', '/dashboard'],
};