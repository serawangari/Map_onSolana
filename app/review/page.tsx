import dynamic from 'next/dynamic';
const ReviewerList = dynamic(() => import('../../components/ReviewerList'), { ssr: false });

export default function ReviewPage() {
  return (
    <main>
      <h1>Reviewer Dashboard (Minimal)</h1>
      <p>Shows rows from <b>PendingSubmissions</b> via server-side token.</p>
      <ReviewerList />
    </main>
  );
}
