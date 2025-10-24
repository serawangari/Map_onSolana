# Map on Solana — ArcGIS (Minimal UI + OAuth)

This starter repo gives you:
- `/` public map (Pakistan) loading your **ArcGIS WebMap** by item ID.
- `/review` minimal reviewer table (reads from your **PendingSubmissions** view via server).
- `/api/arcgis/token-test` server route that uses **OAuth client-credentials** to fetch a real ArcGIS token.

## 1) Prereqs in ArcGIS Online (AGOL)
Already done per your setup: Feature Layers (**Submissions**, **Places**), View (**PendingSubmissions**), Public WebMap (with **Places**).

## 2) Configure Environment
Copy `.env.example` to `.env.local` and fill:
```
ARCGIS_PORTAL=https://www.arcgis.com
ARCGIS_CLIENT_ID=...
ARCGIS_CLIENT_SECRET=...
ARCGIS_PENDING_VIEW_URL=https://services.arcgis.com/<org>/arcgis/rest/services/PendingSubmissions/FeatureServer/0
NEXT_PUBLIC_PUBLIC_WEBMAP_ID=<your_public_webmap_item_id>
```
(Alternatively set `NEXT_PUBLIC_PLACES_URL` if you want to load the layer directly instead of a WebMap.)

## 3) Run Locally
```
npm i
npm run dev
```
Open:
- `http://localhost:3000/` → Public map
- `http://localhost:3000/review` → Pending list
- `http://localhost:3000/api/arcgis/token-test` → OAuth token check

## 4) Deploy
- Push to GitHub, import repo in Vercel.
- Add the same env vars in Vercel Project → Settings → Environment Variables.
- Deploy.

## Notes
- ArcGIS secrets are only used server-side (API routes). The public map uses your public WebMap ID.
- Styling is intentionally minimal (no Tailwind). Add your own CSS as needed.
