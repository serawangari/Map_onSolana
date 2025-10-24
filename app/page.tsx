import dynamic from 'next/dynamic';
import Link from 'next/link';

const ArcMapPublic = dynamic(() => import('../components/ArcMapPublic'), { ssr: false });

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1>🗺️ Map on Solana — Pakistan</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/review">Reviewer</Link>
          <a
            href="https://solana.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solana
          </a>
        </nav>
      </header>

      <section className="intro">
        <h2>Explore and Add Missing Places</h2>
        <p>
          This map displays community-submitted locations across Pakistan.
          Users will soon earn <b>USDC rewards</b> for verified submissions through the
          Solana blockchain. Built with <b>ArcGIS Online</b> and <b>Next.js</b>.
        </p>
      </section>

      <section className="map-section">
        <div className="map-container">
          <ArcMapPublic />
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2025 Map on Solana | Powered by Esri ArcGIS &amp; Solana
        </p>
      </footer>
    </main>
  );
}
