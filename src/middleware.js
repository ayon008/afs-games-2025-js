import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtDecode } from "jwt-decode";

// Define protected routes
const userProtectedRoutes = ['/profile', '/profile/:uid', '/profile/uploadedData'];
const adminProtectedRoutes = ['/adminPanel', '/addAwards', '/faqPanel', '/sponsors', '/uploadedGPX'];

export async function middleware(request) {
    const { pathname } = request.nextUrl; // Get the current request path

    // Get token from cookies
    const cookieStore = cookies();
    const cookieObj = cookieStore.get('userToken');
    const token = cookieObj?.value;

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('message', 'You need to log in to access this page.');

    // Redirect to login page if no token is present and trying to access a protected route
    if (!token && (userProtectedRoutes.includes(pathname) || adminProtectedRoutes.includes(pathname))) {
        console.log('No token, redirecting to login');
        return NextResponse.redirect(loginUrl);
    }

    if (token) {
        // Decode token to get user role
        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Log the decoded token
        } catch (error) {
            console.log('Invalid token, redirecting to login');
            return NextResponse.redirect(loginUrl);
        }

        const isAdmin = decodedToken.admin; // Assume token contains an 'admin' field

        // Admin can access both user and admin-protected routes
        if (isAdmin && (adminProtectedRoutes.includes(pathname) || userProtectedRoutes.includes(pathname))) {
            console.log('Admin access granted');
            return NextResponse.next(); // Allow admin to proceed
        }

        // Regular users can access only user-protected routes
        if (!isAdmin && userProtectedRoutes.includes(pathname)) {
            console.log('User access granted');
            return NextResponse.next(); // Allow user to proceed
        }

        // If a regular user tries to access admin-protected routes, redirect to login
        if (!isAdmin && adminProtectedRoutes.includes(pathname)) {
            console.log('User trying to access admin route, redirecting to login');
            return NextResponse.redirect(loginUrl);
        }

        // If no role-based redirection is needed, continue to the requested page
        return NextResponse.next();
    }
    // If no role-based redirection is needed, continue to the requested page
}

export const config = {
    // Enable middleware for specific paths
    matcher: ['/profile', '/profile/:uid', '/profile/uploadedData', '/adminPanel', '/addAwards', '/faqPanel', '/sponsors', '/uploadedGPX'],
};
