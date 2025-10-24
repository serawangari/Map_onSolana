import dynamic from 'next/dynamic';

const ArcMapPublic = dynamic(() => import('../components/ArcMapPublic'), { ssr: false });

export default function Home() {
  return (
    <main>
      <h1>Map on Solana — Pakistan</h1>
      <p>Public map loading your ArcGIS <b>WebMap</b>. Centered on Pakistan.</p>
      <div className="mapShell">
        <ArcMapPublic />
      </div>
    </main>
  );
}
