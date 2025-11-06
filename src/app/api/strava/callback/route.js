import { NextResponse } from 'next/server';
import { getStravaTokens } from '@/lib/strava';

export async function GET(request) {
    try {
        // Get the authorization code from the URL query parameters
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
        }

        // Exchange the authorization code for tokens
        const tokens = await getStravaTokens(code);

        return NextResponse.json(tokens);
    } catch (error) {
        console.error('Strava auth error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}