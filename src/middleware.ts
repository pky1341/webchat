import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth/jwt";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("auth_token")?.value;
    const isVerifying = request.cookies.get("is_verifying")?.value === "true";
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log(`Path: ${path}, Session: ${!!session}, Token: ${!!token}, IsVerifying: ${isVerifying}`);
    const redirectToError = (error: string) => {
        const errUrl = new URL('auth/error', request.url);
        errUrl.searchParams.set('error', error);
        return NextResponse.redirect(errUrl);
    }
    if (path === '/verify-otp' || path === '/dashboard') {
        // if (!session && !token) {
        //     return redirectToError('Not authenticated');
        // }
        if (session) {
            if (session.isVerified) {
                return NextResponse.next();
            }
        } else if (token) {
            const decodedToken = await verifyAccessToken(token);
            if (!decodedToken) {
                return NextResponse.redirect(new URL('/sign-up', request.url));
            }
            if (path === '/verify-otp' && !isVerifying) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            if (path === '/dashboard' && isVerifying) {
                return NextResponse.redirect(new URL('/verify-otp', request.url));
            }
        }
    }
    if (path === '/api/auth/signin' || path === '/api/auth/signup') {
        const error = request.nextUrl.searchParams.get('error');
        if (error) {
            return redirectToError(error);
        }
    }
    // if (session?.isVerified) {
    //     return NextResponse.next();
    // }
    // if (path === '/verify-otp' || path === '/dashboard') {
    //     if (!token) {
    //         return NextResponse.redirect(new URL('/sign-up', request.url));
    //     }
    //     const decodedToken = verifyAccessToken(token);
    //     if (!decodedToken) {
    //         return NextResponse.redirect(new URL('/sign-up', request.url));
    //     }
    //     if (path === '/verify-otp' && isVerifying) {
    //         return NextResponse.next();
    //     }
    //     if (path === '/dashboard' && !isVerifying) {
    //         return NextResponse.next();
    //     }
    // }
    return NextResponse.next();
}

export const config = {
    matcher: ['/verify-otp', '/dashboard', '/api/auth/signin', '/api/auth/signup'],
};