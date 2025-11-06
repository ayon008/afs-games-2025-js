
'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

export default function StravaCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loader } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState(null);
    const loginRedirectTimeout = useRef(null);

    useEffect(() => {
        const handleStravaCallback = async () => {
            const code = searchParams.get('code');

            if (loader) {
                console.log('Waiting for auth...');
                return;
            }

            // Delay redirect to login for 1 second after loader is false and user is null
            if (!loader && !user) {
                if (!loginRedirectTimeout.current) {
                    loginRedirectTimeout.current = setTimeout(() => {
                        if (!user) {
                            console.log('No user found after auth load, redirecting to login...');
                            router.push('/login');
                        }
                    }, 1000); // 1 second grace period
                }
                return;
            } else if (loginRedirectTimeout.current) {
                clearTimeout(loginRedirectTimeout.current);
                loginRedirectTimeout.current = null;
            }

            if (!code) {
                console.log('No code found, redirecting to upload...');
                router.push('/profile/uploadUserData');
                return;
            }

            try {
                const response = await fetch(`/api/strava/callback?code=${code}`);
                if (!response.ok) {
                    const text = await response.text().catch(() => '');
                    throw new Error(`/api/strava/callback returned ${response.status}: ${text}`);
                }
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                try {
                    await axiosSecure.post('/user/strava-tokens', {
                        uid: user.uid,
                        stravaTokens: {
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                            expiresAt: data.expires_at,
                        }
                    });
                } catch (axiosErr) {
                    console.error('Axios error posting tokens:', axiosErr);
                    const status = axiosErr.response?.status;
                    const url = axiosErr.config?.url || '/user/strava-tokens';
                    const respData = axiosErr.response?.data;
                    // If backend endpoint is missing (404), fall back to storing tokens locally so user can continue import during development
                    if (status === 404) {
                        try {
                            // Save tokens under the same keys UploadGPX expects
                            localStorage.setItem('stravaAccessToken', data.access_token);
                            localStorage.setItem('stravaRefreshToken', data.refresh_token);
                            localStorage.setItem('stravaTokenExpiry', data.expires_at);
                            console.warn('Backend endpoint not found — saved Strava tokens to localStorage (stravaAccessToken, stravaRefreshToken, stravaTokenExpiry)');
                            router.push('/profile/uploadUserData');
                            return;
                        } catch (lsErr) {
                            console.error('Failed to save tokens to localStorage:', lsErr);
                        }
                    }
                    setError(`Failed to save Strava tokens to backend (${url}) — status ${status}: ${JSON.stringify(respData)}`);
                    return;
                }

                router.push('/profile/uploadUserData');
            } catch (error) {
                console.error('Error handling Strava callback:', error);
                setError(error.message || 'Unknown error occurred while connecting to Strava.');
            }
        };

        handleStravaCallback();
        // Cleanup timeout on unmount
        return () => {
            if (loginRedirectTimeout.current) {
                clearTimeout(loginRedirectTimeout.current);
            }
        };
    }, [searchParams, user, router, axiosSecure, loader]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                {/* Debug info for troubleshooting */}
                <div className="bg-black bg-opacity-70 text-xs text-green-300 p-2 rounded mb-4 max-w-xl mx-auto break-all">
                    <div><b>DEBUG:</b></div>
                    <div><b>loader:</b> {String(loader)}</div>
                    <div><b>user:</b> {user ? JSON.stringify(user) : 'null'}</div>
                </div>
                {error ? (
                    <>
                        <div className="text-red-500 text-2xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-red-400 mb-2">Strava Connection Failed</h2>
                        <p className="text-gray-300 mb-2">{error}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push('/profile/uploadUserData')}>Back to Upload</button>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-white mb-2">Connecting with Strava...</h2>
                        <p className="text-gray-400">Please wait while we complete the authentication</p>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-lg">Connecting your Strava account...</p>
                    </>
                )}
            </div>
        </div>
    );
}
