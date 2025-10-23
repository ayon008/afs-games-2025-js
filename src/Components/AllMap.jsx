"use client"
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import useAuth from '@/Hooks/useAuth';
import GetUserData from '@/lib/getUserData';

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
];

const customMarker = `<?xml version="1.0" encoding="UTF-8"?>
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

const AllMap = ({ cities, pointTable = [], zoom = 3, maxZoom = 18, minZoom = 2 }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Replace with your actual API key
    });

    const mapRef = React.useRef(null);
    const [markers, setMarkers] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 23.8103, lng: 90.4125 });
    const [selected, setSelected] = useState(null); // { name, position }
    const [participantsForCity, setParticipantsForCity] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    const { user } = useAuth() || {};
    const { userInfo } = GetUserData(user?.uid) || {};

    useEffect(() => {
        if (!isLoaded || !window.google) return;

        const geocoder = new window.google.maps.Geocoder();

        const fetchCityCoordinates = async () => {
            const results = await Promise.all(
                (cities || []).map(city => {
                    return new Promise((resolve) => {
                        geocoder.geocode({ address: city }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                resolve({
                                    name: city,
                                    position: {
                                        lat: results[0].geometry.location.lat(),
                                        lng: results[0].geometry.location.lng()
                                    }
                                });
                            } else {
                                resolve(null);
                            }
                        });
                    });
                })
            );

            setMarkers(results.filter(r => r));
        };

        fetchCityCoordinates();

        // If user has a city in their profile, geocode and center map on it
        const userCity = userInfo?.city;
        if (userCity) {
            geocoder.geocode({ address: userCity }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const loc = results[0].geometry.location;
                    setMapCenter({ lat: loc.lat(), lng: loc.lng() });
                    // if map already loaded, pan to the user's city
                    if (mapRef.current) mapRef.current.panTo({ lat: loc.lat(), lng: loc.lng() });
                }
            });
        }
    }, [isLoaded, cities, userInfo?.city]);

    // responsive check
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        // enforce runtime zoom limits (some options are safer to set after load)
        try {
            mapRef.current.setOptions({ maxZoom, minZoom });
        } catch (e) {
            // ignore
        }
    }, [maxZoom, minZoom]);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const mapOptions = useMemo(() => ({
        disableDefaultUI: true,
        styles: defaultStyle,
        maxZoom,
        minZoom
    }), [maxZoom, minZoom]);

    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const center = mapCenter;

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <section>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        title={marker.name}
                        onClick={() => {
                            // Find participants from this city (case-insensitive)
                            const cityKey = (marker.name || '').trim().toLowerCase();
                            const participants = (pointTable || []).map((d, i) => ({ ...d, __pos: i + 1 }))
                                .filter(d => (d.city || '').toString().trim().toLowerCase() === cityKey);
                            setParticipantsForCity(participants);
                            setSelected({ name: marker.name, position: marker.position });
                        }}
                        icon={{
                            url: `data:image/svg+xml;utf8,${encodeURIComponent(customMarker)}`,
                            scaledSize: new window.google.maps.Size(36, 49)
                        }}
                    />
                ))}

                {!isMobile && selected && (
                    <InfoWindow
                        position={selected.position}
                        onCloseClick={() => { setSelected(null); setParticipantsForCity([]); }}
                    >
                        <div className="w-80 max-w-sm bg-black text-white rounded-lg shadow-xl border border-white/10 p-4">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold">{selected.name}</div>
                                <div className="text-sm text-white/70">{participantsForCity.length} participant{participantsForCity.length !== 1 ? 's' : ''}</div>
                            </div>

                            <div className="mt-3 max-h-[280px] overflow-y-auto space-y-3 pr-1">
                                {participantsForCity.length === 0 ? (
                                    <div className="text-base text-white/70">No participants found for this city.</div>
                                ) : (
                                    participantsForCity.map((p, idx) => {
                                        const totalTime = p?.total
                                        const distance = p?.distance
                                        return (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <Image src={p.photoURL || '/Profile_avatar_placeholder_large.png'} alt={p.displayName || 'avatar'} width={40} height={40} className="object-cover" unoptimized />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <div className="truncate font-medium text-base">{p.displayName || p.name || 'Participant'}</div>
                                                        <div className='flex items-center gap-1'>
                                                            <p className='text-white/60'>Position</p>
                                                            <div className="text-sm text-white/70 font-medium">#{p.__pos}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2 text-sm text-white/70">
                                                        <div className="px-3 py-1 rounded bg-white/10 font-medium">{Number(distance || 0).toFixed(1)} km</div>
                                                        <div className="px-3 py-1 rounded bg-white/10 font-medium">{Number(totalTime).toFixed(1)} h</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </InfoWindow>
                )}

                {/* Mobile bottom sheet */}
                {isMobile && selected && (
                    <div className="fixed left-4 right-4 bottom-6 z-50">
                        <div className="bg-black/95 text-white rounded-xl shadow-xl border border-white/10 p-5 max-h-[60vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-lg font-semibold">{selected.name}</div>
                                <button
                                    onClick={() => { setSelected(null); setParticipantsForCity([]); }}
                                    className="text-base text-white/70 px-3 py-1.5 rounded hover:bg-white/10"
                                >Close</button>
                            </div>

                            <div className="space-y-4 mt-3">
                                {participantsForCity.length === 0 ? (
                                    <div className="text-base text-white/70 text-center py-4">No participants found for this city.</div>
                                ) : (
                                    participantsForCity.map((p, idx) => {
                                        const totalTime = parseFloat(p.Wingfoil || 0) + parseFloat(p.Windfoil || 0) + parseFloat(p.dw || 0);
                                        const distance = p.distance ?? p.total ?? 0;
                                        return (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <Image src={p.photoURL || '/Profile_avatar_placeholder_large.png'} alt={p.displayName || 'avatar'} width={48} height={48} className="object-cover" unoptimized />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <div className="truncate font-medium text-base">{p.displayName || p.name || 'Participant'}</div>
                                                        <div className="text-sm text-white/70 font-medium">#{p.__pos}</div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2 text-base text-white/70">
                                                        <div className="px-3 py-1 rounded bg-white/10 font-medium">{Number(distance || 0).toFixed(1)} km</div>
                                                        <div className="px-3 py-1 rounded bg-white/10 font-medium">{Number(totalTime).toFixed(1)} h</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </GoogleMap>
        </section>
    );
};

export default AllMap;