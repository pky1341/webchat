import { verifyAccessToken } from "@/lib/auth/jwt";
import UserModel from "@/model/User";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({message:'Unauthorized'},{status:401});
        }
        const decodeToken = verifyAccessToken(token);
        if (!decodeToken) {
            return NextResponse.json({message:'Invalid token'},{status:401});
        }
        const user = await UserModel.findOne({email:decodeToken.email}).select('-password');
        if (!user) {
            return NextResponse.json({message:"user not found"},{status:404});
        }
        return NextResponse.json({user},{status:200});
    } catch (err) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}