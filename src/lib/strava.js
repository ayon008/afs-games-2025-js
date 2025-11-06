// Strava API configuration
const STRAVA_CONFIG = {
    clientId: '184145',
    clientSecret: 'eff0edae7b920f7e7d2de0f6ce6b84d147f2e368',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/strava-callback` : '',
};

// Get Strava authorization URL
export const getStravaAuthUrl = () => {
    const scope = 'activity:read_all,profile:read_all';
    return `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CONFIG.clientId}&response_type=code&redirect_uri=${STRAVA_CONFIG.redirectUri}&approval_prompt=force&scope=${scope}`;
};

// Exchange authorization code for tokens
export const getStravaTokens = async (code) => {
    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: STRAVA_CONFIG.clientId,
            client_secret: STRAVA_CONFIG.clientSecret,
            code,
            grant_type: 'authorization_code',
        }),
    });
    return response.json();
};

// Get user's Strava activities
export const getStravaActivities = async (accessToken) => {
    const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

// Get specific activity details
export const getActivityGPX = async (activityId, accessToken) => {
    const response = await fetch(`https://www.strava.com/api/v3/activities/${activityId}/streams?keys=latlng,time,distance&key_by_type=true`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return response.json();
};