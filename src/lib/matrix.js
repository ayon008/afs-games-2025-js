import { createClient } from 'matrix-js-sdk';

// Matrix homeserver URL - replace with your homeserver
const MATRIX_SERVER_URL = 'https://matrix.org';
// Community room ID - create a public room and put its ID here
const COMMUNITY_ROOM_ID = '#afs-games:matrix.org';

// Initialize Matrix client
export function createMatrixClient(accessToken = null) {
    return createClient({
        baseUrl: MATRIX_SERVER_URL,
        accessToken,
        userId: null, // Will be set after login
        useAuthorizationHeader: true
    });
}

// Generate a Matrix username from Firebase user
export function generateMatrixUsername(firebaseUser) {
    // Remove special characters and spaces, make lowercase
    const cleanName = firebaseUser.displayName
        ?.toLowerCase()
        .replace(/[^a-z0-9_]/g, '_') || 
        firebaseUser.uid.slice(0, 8);
    return `@${cleanName}:${new URL(MATRIX_SERVER_URL).hostname}`;
}

// Generate initial device ID
export function generateDeviceId() {
    return `AFSGames_Web_${Math.random().toString(36).slice(2, 10)}`;
}

export { MATRIX_SERVER_URL, COMMUNITY_ROOM_ID };