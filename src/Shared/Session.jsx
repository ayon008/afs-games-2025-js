"use client"
import useGetSessionHistory from "@/js/GetSessionHistory";
import React, { useState } from "react";
import { FaShareSquare } from "react-icons/fa";

const Session = ({ uid }) => {
  const { sessionHistory, isLoading, isError, error } = useGetSessionHistory(uid);
  console.log(sessionHistory, 'hi');
  // no modal; share directly from the icon

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  // Snazzy-style map design (converted to Static Maps 'style' params)
  const mapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }],
    },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#fefefe' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];

  const mapStyleToStaticParams = (styleArray) => {
    return styleArray
      .map((rule) => {
        const parts = [];
        if (rule.featureType) parts.push(`feature:${rule.featureType}`);
        if (rule.elementType) parts.push(`element:${rule.elementType}`);
        const stylers = rule.stylers || [];
        stylers.forEach((styler) => {
          for (const k in styler) {
            const v = styler[k];
            if (k === 'color') {
              const hex = String(v).replace('#', '');
              parts.push(`color:0x${hex}`);
            } else if (k === 'lightness') {
              parts.push(`lightness:${v}`);
            } else if (k === 'visibility') {
              parts.push(`visibility:${v}`);
            } else if (k === 'weight') {
              parts.push(`weight:${v}`);
            } else if (k === 'saturation') {
              parts.push(`saturation:${v}`);
            } else {
              parts.push(`${k}:${v}`);
            }
          }
        });
        return `style=${encodeURIComponent(parts.join('|'))}`;
      })
      .join('&');
  };
  // Encode an array of [lng, lat] GeoJSON points into a Google encoded polyline
  const encodePolyline = (coords) => {
    if (!Array.isArray(coords) || coords.length === 0) return '';
    // convert to [lat, lng]
    const points = coords.map((p) => [p[1], p[0]]);
    let lastLat = 0;
    let lastLng = 0;
    let result = '';

    const encodeValue = (v) => {
      let sv = Math.round(v * 1e5);
      sv = sv < 0 ? ~(sv << 1) : sv << 1;
      let chunks = '';
      while (sv >= 0x20) {
        chunks += String.fromCharCode((0x20 | (sv & 0x1f)) + 63);
        sv >>= 5;
      }
      chunks += String.fromCharCode(sv + 63);
      return chunks;
    };

    for (let i = 0; i < points.length; i++) {
      const lat = points[i][0];
      const lng = points[i][1];
      const dLat = lat - lastLat;
      const dLng = lng - lastLng;
      result += encodeValue(dLat);
      result += encodeValue(dLng);
      lastLat = lat;
      lastLng = lng;
    }
    return result;
  };

  const openShareFor = async (singleHistory) => {
    const coords = singleHistory?.geojson?.features?.[0]?.geometry?.coordinates || singleHistory?.coordinates || null;
    const filename = singleHistory?.filename || 'session';
    if (!coords || !Array.isArray(coords) || coords.length < 1) {
      // fallback: nothing to share
      alert('No coordinates available for this session')
      return;
    }

    // Normalize to array of points [lng, lat]
    const points = Array.isArray(coords[0]) ? coords : [coords];

    // center on middle
    const mid = points[Math.floor(points.length / 2)];
    const centerLat = mid[1];
    const centerLng = mid[0];

    const size = '800x400';
    const zoom = 12;
    const encoded = encodePolyline(points);
    const path = `enc:${encoded}`;

    const start = `${points[0][1]},${points[0][0]}`;
    const end = `${points[points.length - 1][1]},${points[points.length - 1][0]}`;

  const keyParam = apiKey ? `&key=${apiKey}` : '';
  const styleParams = mapStyleToStaticParams(mapStyle);
  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&zoom=${zoom}&path=weight:3%7Ccolor:0x0000ff%7C${encodeURIComponent(path)}&markers=color:green%7Clabel:S%7C${encodeURIComponent(start)}&markers=color:red%7Clabel:E%7C${encodeURIComponent(end)}&${styleParams}${keyParam}`;

    // If the route is short, craft a Google Maps directions URL including intermediate waypoints
    let mapLink = '';
    try {
      if (points.length <= 10) {
        // include intermediate points (exclude first/last)
        const waypoints = points.slice(1, -1).map((pt) => `${pt[1]},${pt[0]}`).join('|');
        const base = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&travelmode=driving`;
        mapLink = waypoints ? `${base}&waypoints=${encodeURIComponent(waypoints)}` : base;
      } else {
        // for long tracks, opening the static image is more reliable (shows full encoded path)
        mapLink = imageUrl;
      }
    } catch (e) {
      console.warn('Failed to build map link with waypoints, falling back to static image', e);
      mapLink = imageUrl;
    }

    const appLeaderboardUrl = `https://afs-games-2025-js.vercel.app/leaderboard/#${uid}`;
    const shareUrl = mapLink || imageUrl || appLeaderboardUrl || '';

    if (navigator.share) {
      try {
        // Prefer sharing the image file itself so recipients see the image, not a link.
        if (imageUrl && window.fetch && navigator.canShare) {
          try {
            const res = await fetch(imageUrl, { mode: 'cors' });
            const blob = await res.blob();
            const fileName = `${filename}-map.png`;
            const file = new File([blob], fileName, { type: blob.type || 'image/png' });

            const text = `Check out this session. View leaderboard: ${appLeaderboardUrl}`;
            // Share only the image file and include the leaderboard URL in text/url fields
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({ files: [file], title: filename, text, url: appLeaderboardUrl });
              return;
            }
          } catch (fetchErr) {
            // Could not fetch/share the image (CORS or network) — fall back to sharing URL
            console.warn('Fetching or sharing image failed, falling back to URL share', fetchErr);
          }
        }

        // Fallback: share the app leaderboard link so recipients can view the site
        await navigator.share({ title: filename, text: `Check out this session. View leaderboard: ${appLeaderboardUrl}`, url: appLeaderboardUrl });
        return;
      } catch (e) {
        // fall through to open link
        console.warn('Web share failed', e);
      }
    }

    if (shareUrl) window.open(shareUrl, '_blank')
  };

  // modal removed — no closeShare needed


  return (
    <div className="text-white lg:my-20 my-10 ">
      <h2 className="font-semibold 2xl:text-5xl xl:text-3xl">
        Your Session History
      </h2>
      <p className="2xl:text-2xl xl:text-lg 2xl:mt-14 xl:mt-7 font-semibold">
        Your Uploaded Sessions
      </p>
      <div className="mt-10 w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>File Name</th>
              <th>Category</th>
              <th>Time</th>
              <th>Distance</th>
              <th>Share</th>
            </tr>
          </thead>
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan={5}>Loading session history...</td>
              </tr>
            </tbody>
          )}

          {isError && (
            <tbody>
              <tr>
                <td colSpan={5}>Error loading session history: {error?.message}</td>
              </tr>
            </tbody>
          )}

          {!isLoading && !isError && (
            <tbody>
              {Array.isArray(sessionHistory) && sessionHistory.length > 0 ? (
                sessionHistory.map((singleHistory, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{singleHistory.filename}</td>
                    <td className="uppercase font-semibold">{singleHistory.category ?? ''}</td>
                    <td>{singleHistory.totalTime.toFixed(2) ?? singleHistory.time.toFixed(2) ?? ''} Hours</td>
                    <td>{singleHistory?.distance?.toFixed(2) ?? ''} Km</td>
                    <td>
                      <button className="btn btn-outline text-white" onClick={() => openShareFor(singleHistory)}>
                        <FaShareSquare />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No sessions uploaded yet.</td>
                </tr>
              )}
            </tbody>
          )}

        </table>
      </div>

      {/* Modal removed: sharing happens directly when user clicks the share icon */}
    </div>
  );
};

export default Session;
