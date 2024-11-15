import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest)=>{
    try {
        // get token value from cookies and stores in token const;
        // If the cookie is not found, it defaults to an empty string.
        const token =  request.cookies.get('token')?.value || '';

        // extracting data from token {i.e. id, username, email};
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return user id ONLY;
        return decodedToken.id;

    } catch (error: any) {
        throw new Error(error.message);
    }
}