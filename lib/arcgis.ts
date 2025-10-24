import { getArcGISToken } from './arcgisAuth';

export async function arcgisQuery(layerUrl: string, params: Record<string, string>) {
  const token = await getArcGISToken();
  const body = new URLSearchParams({ f: 'json', token, ...params });
  const res = await fetch(`${layerUrl}/query`, { method: 'POST', body });
  const json = await res.json();
  if (json.error) throw new Error(JSON.stringify(json.error));
  return json;
}
