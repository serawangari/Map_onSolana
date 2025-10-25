'use client';
import { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Zoom from '@arcgis/core/widgets/Zoom';
import Attribution from '@arcgis/core/widgets/Attribution';

export default function ArcMapPublic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new WebMap({
      portalItem: { id: process.env.NEXT_PUBLIC_PUBLIC_WEBMAP_ID! },
      basemap: 'openstreetmap' // Set to OpenStreetMap
    });

    const view = new MapView({
      container: ref.current!,
      map,
      center: [73.0479, 33.6844], // Center on Pakistan
      zoom: 6
    });

    // Add Scale Bar widget
    const scaleBar = new ScaleBar({
      view: view,
      unit: 'metric' // or 'imperial' depending on preference
    });
    view.ui.add(scaleBar, 'bottom-left'); // Add it to the bottom-left corner

    // Add Zoom widget (zoom-in/zoom-out controls)
    const zoom = new Zoom({
      view: view
    });
    view.ui.add(zoom, 'top-left'); // Add it to the top-left corner

    // Add Attribution widget for OpenStreetMap credits
    const attribution = new Attribution({
      view: view
    });
    view.ui.add(attribution, 'bottom-right'); // Add it to the bottom-right corner

    return () => view.destroy();
  }, []);

  return <div ref={ref} style={{ height: '75vh', width: '100%' }} />;
}
