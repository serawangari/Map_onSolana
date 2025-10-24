import { getArcGISToken } from '@/lib/arcgisAuth';

export async function POST(req: Request) {
  try {
    const { submissionId } = await req.json();
    const token = await getArcGISToken();

    const submissionsUrl = process.env.ARCGIS_SUBMISSIONS_URL!;
    const res = await fetch(`${submissionsUrl}/applyEdits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        f: 'json',
        token,
        updates: JSON.stringify([{
          attributes: {
            objectId: submissionId,
            status: 'rejected'
          }
        }])
      })
    });

    const json = await res.json();
    if (json.error) throw new Error(JSON.stringify(json.error));
    return Response.json({ ok: true });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e.message }),
      { status: 400 }
    );
  }
}
