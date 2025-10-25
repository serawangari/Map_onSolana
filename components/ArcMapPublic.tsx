'use client';
import { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

export default function ArcMapPublic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Initializing WebMap...');
    
    const map = new WebMap({
      portalItem: { id: process.env.NEXT_PUBLIC_PUBLIC_WEBMAP_ID! },
      basemap: 'openstreetmap', // Set to OpenStreetMap
    });

    const view = new MapView({
      container: ref.current!,
      map,
      center: [73.0479, 33.6844], // Center on Pakistan
      zoom: 6,
    });

    view.when(() => {
      console.log('Map loaded successfully');
    }).catch((error) => {
      console.error('Error loading the map:', error);
    });

    return () => view.destroy();
  }, []);

  return <div ref={ref} style={{ height: '75vh', width: '100%' }} />;
}
