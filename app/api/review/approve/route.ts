import { getArcGISToken } from '@/lib/arcgisAuth';

export async function POST(req: Request) {
  try {
    const { submissionId, finalize_tx } = await req.json();
    const token = await getArcGISToken();

    // 1️⃣ Get submission data from Submissions
    const submissionsUrl = process.env.ARCGIS_SUBMISSIONS_URL!;
    const placesUrl = process.env.ARCGIS_PLACES_URL!;

    const queryRes = await fetch(`${submissionsUrl}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        f: 'json',
        token,
        where: `objectId=${submissionId}`,
        outFields: '*',
        returnGeometry: 'true'
      })
    }).then(r => r.json());

    const feature = queryRes.features?.[0];
    if (!feature) throw new Error('Submission not found');

    // 2️⃣ Copy to Places
    feature.attributes.finalize_tx = finalize_tx;

    await fetch(`${placesUrl}/applyEdits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        f: 'json',
        token,
        adds: JSON.stringify([feature])
      })
    });

    // 3️⃣ Mark submission as accepted
    feature.attributes.status = 'accepted';
    await fetch(`${submissionsUrl}/applyEdits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        f: 'json',
        token,
        updates: JSON.stringify([{
          attributes: {
            objectId: submissionId,
            status: 'accepted'
          }
        }])
      })
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e.message }),
      { status: 400 }
    );
  }
}
