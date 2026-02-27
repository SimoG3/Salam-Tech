'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useGoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!measurementId) return;

    if (!window.dataLayer) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', measurementId);
    }

    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    window.gtag('event', 'page_view', { page_path: url });
  }, [pathname, searchParams]);
}

export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

// Declare gtag types for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}