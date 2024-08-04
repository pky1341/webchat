import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoDB from "@/lib/mongoDB";
import UserModel, { IUser } from "@/model/User";
import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
    interface Session {
        user: IUser;
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        isVerified: boolean;
        username: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials?.identifier || !credentials.password) {
                    throw new Error("Missing credentials");
                }
                await mongoDB();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    }).select('+password');
                    if (!user) {
                        throw new Error("No user found with this email");
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account before logging in");
                    }
                    const isPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPassword) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.isVerified = (user as IUser).isVerified;
                token.username = (user as IUser).username;
            }
            if (account?.provider === "google") {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.isVerified = token.isVerified as boolean;
                session.user.username = token.username as string;
            }
            return session;
        },
        async signIn({ user, account,profile }) {
            if (account?.provider === "google") {
                await mongoDB();
                let existingUser = await UserModel.findOne({ email: user.email });
                if (!existingUser) {
                    const newUser = await UserModel.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        isVerified: true,
                        username: (user.email as string)?.split('@')[0],
                        googleId: profile?.sub
                    });
                    user.id = newUser.id;
                    (user as IUser).isVerified = true;
                    (user as IUser).username = newUser.username;
                }else{
                    user.id = existingUser.id;
                    (user as IUser).isVerified = existingUser.isVerified;
                    (user as IUser).username = existingUser.username;
                }
            }
            return true;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
        error:'auth/error'
    },
};
