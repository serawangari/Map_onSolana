import { arcgisQuery } from '@/lib/arcgis';

export async function GET() {
  const url = process.env.ARCGIS_PENDING_VIEW_URL!;
  try {
    const data = await arcgisQuery(url, {
      where: '1=1',
      outFields: 'objectId,name,category,wallet,created_at,status',
      returnGeometry: 'true'
    });
    return Response.json({ features: data.features ?? [] });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e.message }),
      { status: 400 }
    );
  }
}
