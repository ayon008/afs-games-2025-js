import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const accessToken = searchParams.get('access_token');

        if (!accessToken) {
            return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
        }

        // Fetch activities from Strava
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const activities = await response.json();
        return NextResponse.json(activities);

    } catch (error) {
        console.error('Error fetching Strava activities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Strava activities' },
            { status: error.status || 500 }
        );
    }
}