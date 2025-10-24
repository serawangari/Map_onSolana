let cache = { token: '', exp: 0 };

export async function getArcGISToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cache.token && now < cache.exp - 60) return cache.token;

  const res = await fetch(`${process.env.ARCGIS_PORTAL}/sharing/rest/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.ARCGIS_CLIENT_ID!,
      client_secret: process.env.ARCGIS_CLIENT_SECRET!,
      grant_type: 'client_credentials',
      f: 'json'
    })
  }).then(r => r.json());

  if (res.error) throw new Error(JSON.stringify(res.error));
  cache = { token: res.access_token, exp: now + res.expires_in };
  return cache.token;
}
