import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// Main Logic or Middleware function 
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    // Check if path is public or not i.e, Login and Signup  
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    // Check if token is empty or not and store in (Const)token;
    const token = request.cookies.get('token')?.value || '';

    // If path is public and user have token means user will redirect to the profile page;
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    // If path is private(i.e. profile) and user don't have token, user will redirect to login page;
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));

    }
}
 
//"Matching Paths" for routing 
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup', 
        '/verifyemail'
    ]
}