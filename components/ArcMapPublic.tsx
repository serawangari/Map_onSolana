'use client';
import { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

export default function ArcMapPublic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new WebMap({
      portalItem: { id: process.env.NEXT_PUBLIC_PUBLIC_WEBMAP_ID! }
    });

    const view = new MapView({
      container: ref.current!,
      map,
      // Fallback to Pakistan if WebMap has no initial extent
      center: [73.0479, 33.6844],
      zoom: 6
    });

    return () => view.destroy();
  }, []);

  return <div ref={ref} style={{ height: '75vh', width: '100%' }} />;
}
