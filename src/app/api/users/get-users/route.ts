import mongoDB from "@/lib/mongoDB";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        if (request.method === "GET") {
        await mongoDB();
        const fetchData = await UserModel.find({}).lean();
        if (!fetchData) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }
        return NextResponse.json(fetchData);
        }else{
            return NextResponse.json({message:"method not allowed"},{status:405});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
