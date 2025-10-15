"use client"
import useGetSessionHistory from "@/js/GetSessionHistory";
import React, { useState } from "react";
import { FaShareSquare } from "react-icons/fa";

const Session = ({ uid }) => {
  const { sessionHistory, isLoading, isError, error } = useGetSessionHistory(uid);
  console.log(sessionHistory,'hi');
  const [shareModal, setShareModal] = useState({ open: false, imageUrl: '', mapLink: '', filename: '' });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const openShareFor = (singleHistory) => {
    // safe access to coordinates: geojson.features[0].geometry.coordinates
    const coords = singleHistory?.geojson?.features?.[0]?.geometry?.coordinates;
    const filename = singleHistory?.filename || 'session';
    if (!coords || !Array.isArray(coords) || coords.length < 2) {
      // fallback: open share with filename only
      const mapLink = '';
      setShareModal({ open: true, imageUrl: '', mapLink, filename });
      return;
    }
    // coords can be [lng, lat] or an array of points [[lng,lat],[lng,lat],...]
    let lng, lat;
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      lng = coords[0];
      lat = coords[1];
    } else if (Array.isArray(coords[0])) {
      // pick middle point for better centering
      const mid = Math.floor(coords.length / 2);
      const pt = coords[mid] || coords[0];
      lng = pt[0];
      lat = pt[1];
    } else {
      const mapLink = '';
      setShareModal({ open: true, imageUrl: '', mapLink, filename });
      return;
    }

    // Google Maps link (opens in browser)
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    // Build Static Maps image URL
    // size and zoom can be adjusted; scale=2 for higher-res
    const zoom = 13;
    const size = '800x400';
    const marker = `color:red|${lat},${lng}`;
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&scale=2&markers=${encodeURIComponent(marker)}${keyParam}`;

    setShareModal({ open: true, imageUrl, mapLink, filename });
  };

  const closeShare = () => setShareModal({ open: false, imageUrl: '', mapLink: '', filename: '' });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy failed');
    }
  };

  const downloadImage = async (url, filename) => {
    if (!url) return alert('No image available');
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObj;
      a.download = filename || 'map.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlObj);
    } catch (e) {
      console.error(e);
      alert('Download failed');
    }
  };

  const tryWebShare = async (title, text, url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (e) {
        console.warn('Web share failed', e);
      }
    } else {
      alert('Web Share not supported on this browser');
    }
  };
  

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

      {/* Share modal */}
      {shareModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg max-w-xl w-full p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Share {shareModal.filename}</h3>
              <button onClick={closeShare} className="btn btn-ghost">Close</button>
            </div>
            <div className="mt-3">
              {shareModal.imageUrl ? (
                <img src={shareModal.imageUrl} alt="map" className="w-full h-48 object-cover rounded" />
              ) : (
                <div className="text-sm text-gray-600">No location data available for this session.</div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              {shareModal.mapLink && (
                <>
                  <button className="btn" onClick={() => copyToClipboard(shareModal.mapLink)}>Copy Map Link</button>
                  <a className="btn" href={shareModal.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
                </>
              )}
              {shareModal.imageUrl && (
                <>
                  <button className="btn" onClick={() => copyToClipboard(shareModal.imageUrl)}>Copy Image URL</button>
                  <button className="btn" onClick={() => downloadImage(shareModal.imageUrl, `${shareModal.filename}-map.png`)}>Download Image</button>
                  <button className="btn" onClick={() => tryWebShare(shareModal.filename, 'Check out my session', shareModal.imageUrl)}>Share</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;
