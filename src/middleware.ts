import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("auth_token")?.value;
    const isVerifying = request.cookies.get("is_verifying")?.value === "true";
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET});
    // console.log(`Path: ${path}, Session: ${!!session}, Token: ${!!token}, IsVerifying: ${isVerifying}`);
    // if(path === '/sign-in'){
    //     if (isVerifying) {
    //         const response = NextResponse.redirect(new URL('/sign-in', request.url));
    //         response.cookies.set("is_verifying", "false");
    //         return response;
    //     }
    // }
    const isAuthenticated = !!token || !!session;
    if (isAuthenticated && (path === '/sign-in' || path === '/sign-up')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (path === '/verify-otp' || path === '/dashboard') {
        if (!token && !session) {
            return NextResponse.redirect(new URL('/sign-in',request.url));
        }
        if (session) {
            if (path === '/verify-otp') {
                return NextResponse.redirect(new URL('/dashboard', request.url));   
            }
            if (session.isVerified) {
                return NextResponse.next();
            }
        } else if (token) {
            const decodedToken = await verifyAccessToken(token);
            if (!decodedToken) {
                return NextResponse.redirect(new URL('/sign-in', request.url));
            }
            if (path === '/verify-otp' && !isVerifying) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            if (path === '/dashboard' && isVerifying) {
                return NextResponse.redirect(new URL('/verify-otp', request.url));
            }
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/verify-otp', '/dashboard', '/sign-up', '/sign-in'],
};