"use client"
import useAuth from '@/Hooks/useAuth';
import GetUserData from '@/lib/getUserData';
import React, { useEffect, useRef, useState } from 'react';
import mapPin from "../../public/assets/98a0413f-1233-4902-9fd6-eb762db785a5.jpg"

// Inline SVG marker (kept as provided) — will be encoded to a data URL for Google Maps
const svgMarker = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="36" height="49" viewBox="0 0 36 49" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M36 20C36 33 18 49 18 49C18 49 0 33 0 20.5C0 8 7.50659 0 18 0C28.4934 0 36 7 36 20Z" fill="#ffe500"/>
<mask id="mask0_10168_4465" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="16" width="30" height="7">
<rect x="3" y="16" width="30" height="6.25" fill="url(#pattern0_10168_4465)"/>
</mask>
<g mask="url(#mask0_10168_4465)">
<rect x="3" y="16" width="30.3358" height="7.20744" fill="black"/>
</g>
<defs>
<pattern id="pattern0_10168_4465" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_10168_4465" transform="scale(0.00358579 0.0172118)"/>
</pattern>
<image id="image0_10168_4465" width="282" height="67" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>`;

const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarker)}`;

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
                    // marker using provided SVG data URL — keep original dimensions (36x49)
                    new window.google.maps.Marker({
                        position: loc,
                        map: mapRef.current,
                        title: city,
                        icon: {
                            url: svgDataUrl,
                            size: new window.google.maps.Size(36, 49),
                            scaledSize: new window.google.maps.Size(36, 49),
                            // anchor at bottom-center
                            anchor: new window.google.maps.Point(18, 49),
                        },
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
