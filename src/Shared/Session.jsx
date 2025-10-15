"use client";
import useGetSessionHistory from "@/js/GetSessionHistory";
import React, { useState } from "react";
import Image from "next/image";
import { FaShareSquare } from "react-icons/fa";

const Session = ({ uid }) => {
  const { sessionHistory, isLoading, isError, error } = useGetSessionHistory(uid);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [preview, setPreview] = useState(null);

  // Map Style Configuration
  const mapStyle = [
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
    { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
    { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
    { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] },
    { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
    { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] },
  ];

  // Convert map style array to Google Static Maps API parameters
  const mapStyleToStaticParams = (styleArray) =>
    styleArray
      .map((rule) => {
        const parts = [];
        if (rule.featureType) parts.push(`feature:${rule.featureType}`);
        if (rule.elementType) parts.push(`element:${rule.elementType}`);
        const stylers = rule.stylers || [];
        stylers.forEach((styler) => {
          for (const k in styler) {
            const v = styler[k];
            if (k === "color") {
              const hex = String(v).replace("#", "");
              parts.push(`color:0x${hex}`);
            } else {
              parts.push(`${k}:${v}`);
            }
          }
        });
        return `style=${encodeURIComponent(parts.join("|"))}`;
      })
      .join("&");

  // Encode an array of coordinates to Google encoded polyline
  const encodePolyline = (coords) => {
    if (!Array.isArray(coords) || coords.length === 0) return "";
    const points = coords.map((p) => [p[1], p[0]]);
    let lastLat = 0;
    let lastLng = 0;
    let result = "";

    const encodeValue = (v) => {
      let sv = Math.round(v * 1e5);
      sv = sv < 0 ? ~(sv << 1) : sv << 1;
      let chunks = "";
      while (sv >= 0x20) {
        chunks += String.fromCharCode((0x20 | (sv & 0x1f)) + 63);
        sv >>= 5;
      }
      chunks += String.fromCharCode(sv + 63);
      return chunks;
    };

    for (let i = 0; i < points.length; i++) {
      const [lat, lng] = points[i];
      const dLat = lat - lastLat;
      const dLng = lng - lastLng;
      result += encodeValue(dLat);
      result += encodeValue(dLng);
      lastLat = lat;
      lastLng = lng;
    }
    return result;
  };

  // Sharing Function
  const openShareFor = async (singleHistory) => {
    const coords =
      singleHistory?.geojson?.features?.[0]?.geometry?.coordinates ||
      singleHistory?.coordinates ||
      null;
    const filename = singleHistory?.filename || "session";

    if (!coords || !Array.isArray(coords) || coords.length < 1) {
      alert("No coordinates available for this session");
      return;
    }

    const points = Array.isArray(coords[0]) ? coords : [coords];
    const mid = points[Math.floor(points.length / 2)];
    const [centerLng, centerLat] = mid;
    const size = "800x400";
    const zoom = 12;
    const encoded = encodePolyline(points);
    const path = `enc:${encoded}`;
    const start = `${points[0][1]},${points[0][0]}`;
    const end = `${points[points.length - 1][1]},${points[points.length - 1][0]}`;

    const keyParam = apiKey ? `&key=${apiKey}` : "";
    const styleParams = mapStyleToStaticParams(mapStyle);
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&zoom=${zoom}&path=weight:3%7Ccolor:0x0000ff%7C${encodeURIComponent(
      path
    )}&markers=color:green%7Clabel:S%7C${encodeURIComponent(
      start
    )}&markers=color:red%7Clabel:E%7C${encodeURIComponent(
      end
    )}&${styleParams}${keyParam}`;

    const appLeaderboardUrl = `https://afs-games-2025-js.vercel.app/leaderboard#${uid}`;
    const shareText = `🚀 Check out this session from AFS Games!\n\n🌍 View on Leaderboard:\n${appLeaderboardUrl}`;

    // Show preview
    setPreview({ link: appLeaderboardUrl, imageUrl });

    if (navigator.share) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], `${filename}-map.png`, {
          type: blob.type || "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: filename,
            text: shareText,
            url: appLeaderboardUrl,
          });
          return;
        }
      } catch (err) {
        console.warn("Image fetch/share failed — fallback to URL share", err);
      }

      try {
        await navigator.share({ title: filename, text: shareText, url: appLeaderboardUrl });
        return;
      } catch (err) {
        console.warn("Web share failed, fallback to open link", err);
      }
    }

    // Fallback if Web Share not available
    window.open(appLeaderboardUrl, "_blank");
  };

  return (
    <div className="text-white lg:my-20 my-10">
      <h2 className="font-semibold 2xl:text-5xl xl:text-3xl">Your Session History</h2>
      <p className="2xl:text-2xl xl:text-lg 2xl:mt-14 xl:mt-7 font-semibold">Your Uploaded Sessions</p>

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
                <td colSpan={6}>Loading session history...</td>
              </tr>
            </tbody>
          )}

          {isError && (
            <tbody>
              <tr>
                <td colSpan={6}>Error loading session history: {error?.message}</td>
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
                    <td className="uppercase font-semibold">{singleHistory.category ?? ""}</td>
                    <td>{singleHistory.totalTime?.toFixed(2) ?? singleHistory.time?.toFixed(2) ?? ""} Hours</td>
                    <td>{singleHistory?.distance?.toFixed(2) ?? ""} Km</td>
                    <td>
                      <button className="btn btn-outline text-white" onClick={() => openShareFor(singleHistory)}>
                        <FaShareSquare />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No sessions uploaded yet.</td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Session;
