import { NextResponse } from 'next/server';
import { MATRIX_SERVER_URL, generateMatrixUsername } from '@/lib/matrix';

// Admin access token for your Matrix server
// WARNING: Keep this secure, preferably in environment variables
const MATRIX_ADMIN_TOKEN = process.env.MATRIX_ADMIN_ACCESS_TOKEN;

export async function POST(request) {
    try {
        const userData = await request.json();
        const { firebaseUser } = userData;

        if (!firebaseUser) {
            return NextResponse.json({ error: 'No user data provided' }, { status: 400 });
        }

        // Generate Matrix username from Firebase user
        const matrixUsername = generateMatrixUsername(firebaseUser);
        const password = `m.${firebaseUser.uid}.${Date.now()}`; // Secure random password

        // Register user on Matrix server
        const registerResponse = await fetch(`${MATRIX_SERVER_URL}/_synapse/admin/v2/users/${encodeURIComponent(matrixUsername)}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${MATRIX_ADMIN_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
                displayname: firebaseUser.displayName || 'AFS Games User',
                avatar_url: firebaseUser.photoURL || '',
                admin: false,
                deactivated: false,
            }),
        });

        if (!registerResponse.ok) {
            const error = await registerResponse.json();
            // If user exists, proceed to login
            if (error?.errcode === 'M_USER_IN_USE') {
                return NextResponse.json({ 
                    username: matrixUsername,
                    password: password,
                    exists: true 
                });
            }
            throw new Error(`Matrix registration failed: ${error?.error || registerResponse.statusText}`);
        }

        // Return credentials for client login
        return NextResponse.json({
            username: matrixUsername,
            password: password,
            exists: false
        });

    } catch (error) {
        console.error('Matrix registration error:', error);
        return NextResponse.json(
            { error: 'Failed to register Matrix user' },
            { status: 500 }
        );
    }
}