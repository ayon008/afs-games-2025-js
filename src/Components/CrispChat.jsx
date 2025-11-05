'use client'
import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const enabledViaEnv = (process.env.NEXT_PUBLIC_CRISP_ENABLED === 'true');
    const isProduction = (process.env.NODE_ENV === 'production');
    if (!enabledViaEnv && !isProduction) return;

    if (window.$crisp || document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "72c97ac6-3167-4d02-9c4d-6255228b963d";

    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    s.onload = () => {
      // Crisp client loaded — the widget will render itself
      console.info('Crisp script loaded, WEBSITE_ID=', window.CRISP_WEBSITE_ID);
    };
    s.onerror = (err) => console.error('Failed to load Crisp script', err);
    d.head.appendChild(s);
  }, []);

  return null;
}
      const d = document;
