import NextAuth, { NextAuthOptions, User,Session,DefaultSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoDB from "@/lib/mongoDB";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any): Promise<any> {
                await mongoDB();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ],
                    });
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }
                    const isPassword = await bcrypt.compare(credentials.password, user.password);
                    if (isPassword) {
                        return user;
                    } else {
                        throw new Error('Incorrect password')
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token,user}){
            if (user) {
                token._id=(user as any)._id?.toString();
                token.isverified=(user as any).isVerified;
                token.username=(user as any).username;
            }
            return token;
        },
        async session({session,token}):Promise<Session>{
            if (token) {
                (session as any).id = token.id;
                // session.user = session.user || {};
                // session.user._id=token._id;
                // session.user.isVerified=token.isVerified;
                // session.user.username=token.username;
            }
            return session;
        }
    },
    session:{
        strategy:'jwt',
        maxAge: 24 * 60 * 60,
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/sign-in'
    }
}