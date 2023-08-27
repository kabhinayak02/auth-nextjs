import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { isJSDocThrowsTag } from "typescript";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if user exist or not;
        const user = await User.findOne({email}); // This is comming from db
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // Check if password is correct;
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        } 

        //Create token data;
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            
        }

        // Create token;
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        // Set token in users cookie;
        const response = NextResponse.json({
            message: "Login Successfuly",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}