'use client'
import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    // Only load Crisp when running in the browser
    if (typeof window === 'undefined') return;

    // Allow explicit enabling via NEXT_PUBLIC_CRISP_ENABLED env var (set to 'true').
    // Otherwise default to loading only in production builds.
    const enabledViaEnv = (process.env.NEXT_PUBLIC_CRISP_ENABLED === 'true');
    const isProduction = (process.env.NODE_ENV === 'production');
    if (!enabledViaEnv && !isProduction) {
      // Not enabled for this environment; do not inject script.
      return;
    }

    // Avoid injecting the script multiple times
    if (window.$crisp || document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "72c97ac6-3167-4d02-9c4d-6255228b963d";

    (function() {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      s.onload = () => {
        // Crisp loaded — you can call API here if needed
      };
      d.getElementsByTagName('head')[0].appendChild(s);
    })();

    // Keep script persistent across client navigation; do not remove on unmount.
  }, []);

  return null;
}
