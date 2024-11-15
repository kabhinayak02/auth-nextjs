import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel"
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest){
    try {
        // It returns the user id; // As server only send user Id ONLY;
        const userId = await getDataFromToken(request);

        // Get all the data of user from db execpt password 
        const user = await User.findOne({_id: userId}).select("-password");

        return NextResponse.json({
            message: "User found",
            data: user,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});

    }
}