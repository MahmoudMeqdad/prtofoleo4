# Vercel + GitHub Deployment Notes

## Current production frontend

- URL: https://iplay-web.vercel.app
- Day 6 auth routes (`/en/login`, `/en/register`, account + admin pages) are published
- Same-origin proxy: `/api/backend/*` (requires `BACKEND_API_URL` once the Nest API is hosted)

## Preferred CLI deployment (monorepo)

Because `@iplay/web` depends on `@iplay/shared`, deploy from the **repository root** (not `apps/web` alone):

```bash
# repository root
vercel deploy --prod --yes
```

Root `vercel.json` runs `npm run build --workspace=@iplay/web`.  
`.vercelignore` keeps uploads small (excludes `node_modules`, `.next`, secrets).

Legacy `apps/web`-only CLI deploys fail `npm install` on the workspace package and should be avoided.

## Connecting GitHub (human action required)

In the Vercel dashboard:

1. Open the `iplay-web` project.
2. Settings → Git → Connect GitHub repository `MahmoudMeqdad/prtofoleo4`.
3. Authorize the Vercel GitHub app / Login Connection if prompted.
4. Set Root Directory to `apps/web`.
5. Framework: Next.js.
6. Install Command: `npm install`
7. Build Command: `next build`
8. Confirm environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://iplay-web.vercel.app`
   - `NEXT_PUBLIC_API_URL` (placeholder until API is hosted)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional)

## Expected behavior after Git connect

- **Preview:** pull requests and non-production branches create Preview deployments.
- **Production:** merges to the production branch (typically `main`) create Production deployments.

Until Git is connected and verified, treat CLI production deploys as the source of truth.
