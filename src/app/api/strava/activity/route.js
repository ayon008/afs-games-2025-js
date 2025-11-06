import { NextResponse } from 'next/server';
import axios from 'axios';

// Strava API configuration
const STRAVA_CONFIG = {
    clientId: '184145',
    clientSecret: 'eff0edae7b920f7e7d2de0f6ce6b84d147f2e368',
};

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const activityId = searchParams.get('activityId');
    const accessToken = searchParams.get('accessToken');

    if (!activityId || !accessToken) {
        return NextResponse.json({ error: 'Missing activity ID or access token' }, { status: 400 });
    }

    try {
        // Fetch activity streams (detailed data)
        const streamsResponse = await axios.get(
            `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=latlng,time,altitude,distance&key_by_type=true`,
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
        );

        // Convert Strava data to GPX format
        const gpx = generateGPX(streamsResponse.data);
        
        return new NextResponse(gpx, {
            headers: {
                'Content-Type': 'application/gpx+xml',
                'Content-Disposition': `attachment; filename="strava_${activityId}.gpx"`
            }
        });
    } catch (error) {
        console.error('Error fetching Strava activity:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function generateGPX(streams) {
    if (!streams.latlng || !streams.time || !streams.distance) {
        throw new Error('Missing required stream data');
    }

    const points = streams.latlng.data.map((coord, index) => ({
        lat: coord[0],
        lon: coord[1],
        time: new Date(streams.time.data[index] * 1000).toISOString(),
        ele: streams.altitude ? streams.altitude.data[index] : 0,
        distance: streams.distance.data[index]
    }));

    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Strava API via AFS Games"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <time>${new Date().toISOString()}</time>
  </metadata>
  <trk>
    <name>Strava Activity</name>
    <trkseg>
      ${points.map(point => `
      <trkpt lat="${point.lat}" lon="${point.lon}">
        <ele>${point.ele}</ele>
        <time>${point.time}</time>
        <extensions>
          <distance>${point.distance}</distance>
        </extensions>
      </trkpt>`).join('')}
    </trkseg>
  </trk>
</gpx>`;

    return gpx;
}