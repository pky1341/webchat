import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET!
);

export async function generateAccessToken(email: string): Promise<string> {
    return await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(JWT_SECRET);
}

export async function verifyAccessToken(
    token: string
): Promise<{ email: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { email: string };
    } catch (error) {
        return null;
    }
}

export async function generateRefreshToken(email: string): Promise<string> {
    return await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(JWT_REFRESH_SECRET);
}

export async function verifyRefreshToken(
    token: string
): Promise<{ email: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
        return payload as { email: string };
    } catch (error) {
        return null;
    }
}
