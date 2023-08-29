import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = await NextResponse.json({
            message: "Logout successfuly",
            success: true,
        })
        // Clearing cookie (or removing token from cookie);
        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}