"use client"
import useAuth from '@/Hooks/useAuth';
import GetUserData from '@/lib/getUserData';
import React, { useEffect, useRef, useState } from 'react';
import mapPin from "../../public/assets/98a0413f-1233-4902-9fd6-eb762db785a5.jpg"

const defaultStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#878787"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f9f5ed"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#aee0f4"
            }
        ]
    }
]

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
                        zoom: 8,
                        styles: style,
                        disableDefaultUI: true,
                    };
                    mapRef.current = new window.google.maps.Map(containerRef.current, opts);
                    // marker using imported pin image
                    const pinUrl = (mapPin && mapPin.src) ? mapPin.src : mapPin;
                    new window.google.maps.Marker({
                        position: loc,
                        map: mapRef.current,
                        title: city,
                        icon: pinUrl ? {
                            url: pinUrl,
                            scaledSize: new window.google.maps.Size(36, 36),
                        } : undefined,
                    });

                    // Draw country border (black) if we have a country name
                    const countryName = userInfo?.pays;
                    if (countryName) {
                        // Use Nominatim to try and fetch a GeoJSON boundary for the country (OpenStreetMap).
                        // Note: Nominatim is a third-party service with usage policies — consider a server proxy or a licensed boundaries dataset for production.
                        const nomUrl = `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=json&polygon_geojson=1&limit=1`;
                        fetch(nomUrl, { headers: { 'Accept': 'application/json' } })
                            .then(r => r.json())
                            .then(json => {
                                if (!json || !json[0] || !json[0].geojson) {
                                    // fallback: draw a circle around the country's approximate center (use geocoder result geometry.center)
                                    return;
                                }
                                const geojson = json[0].geojson;
                                try {
                                    // Clear previous data
                                    mapRef.current.data && mapRef.current.data.forEach(f => mapRef.current.data.remove(f));
                                    // Add geojson (this may be MultiPolygon or Polygon)
                                    mapRef.current.data && mapRef.current.data.addGeoJson(geojson);
                                    // Style the polygon(s)
                                    mapRef.current.data && mapRef.current.data.setStyle({ fillOpacity: 0, strokeColor: '#000000', strokeWeight: 2 });

                                    // Compute bounds from geojson coordinates to fit the map
                                    const bounds = new window.google.maps.LatLngBounds();
                                    const addCoords = (coords) => {
                                        coords.forEach(c => {
                                            if (Array.isArray(c[0])) {
                                                addCoords(c);
                                            } else {
                                                // single [lng, lat]
                                                bounds.extend(new window.google.maps.LatLng(c[1], c[0]));
                                            }
                                        });
                                    };
                                    if (geojson.type === 'Feature') {
                                        const g = geojson.geometry || geojson;
                                        if (g.type === 'Polygon' || g.type === 'MultiPolygon') addCoords(g.coordinates);
                                    } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
                                        addCoords(geojson.coordinates);
                                    }

                                    if (!bounds.isEmpty()) {
                                        // Fit bounds with padding so the polygon isn't tight to the edges
                                        try {
                                            mapRef.current.fitBounds(bounds, 80);
                                        } catch (e) {
                                            // Some environments accept numeric padding, others object — fallback
                                            try { mapRef.current.fitBounds(bounds); } catch (e2) { /* ignore */ }
                                        }

                                        // Slightly zoom out one level for extra margin (don't go below zoom 2)
                                        try {
                                            const currentZoom = mapRef.current.getZoom();
                                            if (typeof currentZoom === 'number') {
                                                mapRef.current.setZoom(Math.max(currentZoom - 1, 2));
                                            }
                                        } catch (e) {
                                            // ignore if getZoom/setZoom aren't ready
                                        }
                                    }
                                } catch (e) {
                                    console.warn('Failed to draw country polygon', e);
                                }
                            })
                            .catch(err => {
                                console.warn('Failed to fetch country boundaries from Nominatim', err);
                                // fallback: do nothing (keep city marker)
                            });
                    }
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
    }, [city, apiKey, style, userInfo?.pays]);

    return (
        <div>
            <h2 className='text-white font-semibold mb-3'>Your City {userInfo?.city && userInfo.city.charAt(0).toUpperCase() + userInfo.city.slice(1)}
            </h2>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {
                isLoading ? <div className="text-white">Loading map...</div> :
                    <div ref={containerRef} style={{ width: '100%', height: `${height}px` }} className='rounded-md overflow-hidden' />
            }
        </div>
    );
};

export default UserMap;
