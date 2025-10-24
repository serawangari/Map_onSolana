import { getArcGISToken } from '@/lib/arcgisAuth';

export async function GET() {
  try {
    const token = await getArcGISToken();
    return Response.json({
      ok: true,
      tokenPreview: token.slice(0, 8) + '…',
      portal: process.env.ARCGIS_PORTAL
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e.message }),
      { status: 400 }
    );
  }
}
