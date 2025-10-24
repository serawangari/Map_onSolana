import './globals.css';

export const metadata = {
  title: 'Map on Solana — Pakistan',
  description: 'Public map + Reviewer minimal UI powered by ArcGIS Online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
