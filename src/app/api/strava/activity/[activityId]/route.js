import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { activityId } = params;
        const searchParams = request.nextUrl.searchParams;
        const accessToken = searchParams.get('access_token');

        if (!activityId || !accessToken) {
            return NextResponse.json({ 
                error: 'Activity ID and access token are required' 
            }, { status: 400 });
        }

        // First get the activity details
        const activityResponse = await fetch(
            `https://www.strava.com/api/v3/activities/${activityId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        if (!activityResponse.ok) {
            throw new Error(`HTTP error! status: ${activityResponse.status}`);
        }

        // Then get the streams data
        const streamsResponse = await fetch(
            `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=latlng,time,distance,altitude&key_by_type=true`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        if (!streamsResponse.ok) {
            throw new Error(`HTTP error! status: ${streamsResponse.status}`);
        }

        const activity = await activityResponse.json();
        const streams = await streamsResponse.json();

        // Generate GPX from the activity and streams data
        const gpx = generateGPX(activity, streams);

        return new NextResponse(gpx, {
            headers: {
                'Content-Type': 'application/gpx+xml',
                'Content-Disposition': `attachment; filename="strava_${activityId}.gpx"`
            }
        });

    } catch (error) {
        console.error('Error fetching Strava activity:', error);
        return NextResponse.json(
            { error: 'Failed to fetch activity data' },
            { status: error.status || 500 }
        );
    }
}

function generateGPX(activity, streams) {
    const points = streams.latlng.data.map((coord, index) => ({
        lat: coord[0],
        lon: coord[1],
        time: new Date(new Date(activity.start_date).getTime() + (streams.time.data[index] * 1000)).toISOString(),
        ele: streams.altitude ? streams.altitude.data[index] : 0,
        distance: streams.distance.data[index]
    }));

    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Strava via AFS Games"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${activity.name}</name>
    <time>${activity.start_date}</time>
  </metadata>
  <trk>
    <name>${activity.name}</name>
    <type>${activity.type}</type>
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