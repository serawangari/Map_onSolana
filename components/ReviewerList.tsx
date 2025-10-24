'use client';
import { useEffect, useState } from 'react';

type Attrs = {
  objectId: number;
  name: string;
  category: string;
  wallet: string;
  created_at: number;
  status: string;
};

export default function ReviewerList() {
  const [rows, setRows] = useState<Attrs[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/review/pending');
      const js = await res.json();
      const list = (js.features ?? []).map((f: any) => f.attributes as Attrs);
      setRows(list);
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Wallet</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={5} style={{ color: '#666' }}>No pending submissions found.</td></tr>
        ) : rows.map((r) => (
          <tr key={r.objectId}>
            <td>{r.name}</td>
            <td>{r.category}</td>
            <td style={{ fontFamily: 'monospace' }}>{r.wallet}</td>
            <td>{new Date(r.created_at).toLocaleString()}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
