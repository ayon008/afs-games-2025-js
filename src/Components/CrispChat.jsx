'use client'
import { useEffect, useState } from 'react';

export default function CrispChat() {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Only load Crisp when running in the browser
    if (typeof window === 'undefined') return;

    // Allow explicit enabling via NEXT_PUBLIC_CRISP_ENABLED env var (set to 'true').
    // Otherwise default to loading only in production builds.
    const enabledViaEnv = (process.env.NEXT_PUBLIC_CRISP_ENABLED === 'true');
    const isProduction = (process.env.NODE_ENV === 'production');
    if (!enabledViaEnv && !isProduction) {
      // Not enabled for this environment; do not inject script.
      setStatus('disabled');
      return;
    }

    // Avoid injecting the script multiple times
    if (window.$crisp || document.querySelector('script[src="https://client.crisp.chat/l.js"]')) {
      setStatus('already-loaded');
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "0d83cdda-b9b8-422e-8478-ef9f338aeed0";

    (function() {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      s.onload = () => {
        // Crisp loaded — set a short timeout to check status
        setStatus('loaded');
        // after a moment, inspect if Crisp reports an error by checking global objects
        setTimeout(() => {
          try {
            // Basic checks
            const hasCrisp = !!window.$crisp;
            const websiteId = window.CRISP_WEBSITE_ID || null;
            console.info('Crisp loaded — $crisp:', hasCrisp, 'CRISP_WEBSITE_ID:', websiteId);
            if (!hasCrisp) setStatus('no-crisp');
            // Note: Crisp widget may display 'invalid website' when the website id
            // is not registered in your Crisp dashboard. We can't detect that server
            // side message from the script here, but network/console will show more.
          } catch (e) {
            console.warn('Crisp post-load check failed', e);
            setStatus('error');
          }
        }, 1000);
      };
      s.onerror = (err) => {
        console.error('Failed to load Crisp script', err);
        setStatus('script-error');
      };
      d.getElementsByTagName('head')[0].appendChild(s);
    })();

    // Keep script persistent across client navigation; do not remove on unmount.
  }, []);

  // If debug flag is set, show a small status badge in the UI to help troubleshooting.
  if (process.env.NEXT_PUBLIC_CRISP_DEBUG === 'true') {
    return (
      <div style={{position:'fixed', left:12, bottom:12, zIndex:99999}}>
        <div style={{background:'#000', color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12, boxShadow:'0 2px 8px rgba(0,0,0,0.6)'}}>
          Crisp: {status}
        </div>
      </div>
    );
  }

  return null;
}
