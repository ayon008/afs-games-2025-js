"use client"
import useAuth from '@/Hooks/useAuth';
import GetUserData from '@/lib/getUserData';
import React, { useEffect, useRef, useState } from 'react';

const defaultStyle = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#e9e9e9" },
            { "lightness": 17 }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" },
            { "lightness": 20 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 17 }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 29 },
            { "weight": 0.2 }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 18 }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" },
            { "lightness": 16 }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" },
            { "lightness": 21 }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            { "color": "#dedede" },
            { "lightness": 21 }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "on" },
            { "color": "#ffffff" },
            { "lightness": 16 }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "saturation": 36 },
            { "color": "#333333" },
            { "lightness": 40 }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }]
    }
];

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            return resolve();
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
    });
}

const UserMap = ({ apiKey, style = defaultStyle, height = 300 }) => {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, updatedProfile } = useAuth();
    const { isLoading, isError, userInfo, refetch } = GetUserData(user?.uid);
    const city = userInfo?.city;

    useEffect(() => {
        if (!city) return;
        const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!key) {
            setError('Google Maps API key not provided. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY or pass apiKey prop.');
            return;
        }

        let mounted = true;
        const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        setLoading(true);

        loadScript(src).then(() => {
            if (!mounted) return;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: city }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const loc = results[0].geometry.location;
                    const opts = {
                        center: loc,
                        zoom: 12,
                        styles: style,
                        disableDefaultUI: true,
                    };
                    mapRef.current = new window.google.maps.Map(containerRef.current, opts);
                    // marker
                    new window.google.maps.Marker({ position: loc, map: mapRef.current, title: city });
                    setLoading(false);
                } else {
                    setError('Could not geocode city: ' + (status || 'unknown'));
                    setLoading(false);
                }
            });
        }).catch((err) => {
            setError('Failed to load Google Maps script');
            setLoading(false);
            console.error(err);
        });

        return () => { mounted = false; };
    }, [city, apiKey, style]);

    return (
        <div>
            <h2 className='text-white font-semibold mb-3'>Your City ${userInfo?.city}</h2>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {
                isLoading ? <div className="text-white">Loading map...</div> :
                    <div ref={containerRef} style={{ width: '100%', height: `${height}px` }} className='rounded-md overflow-hidden' />
            }
        </div>
    );
};

export default UserMap;
