# Vercel + GitHub Deployment Notes

## Current status

- Production URL: https://iplay-web.vercel.app
- Project: `iplay-web` (account `mmeddad2004-1027`)
- Root Directory: `apps/web`
- Current deployment method: **Vercel CLI** (`npx vercel --prod` from `apps/web`)
- Automatic GitHub deploy: **not verified / not assumed configured**

## CLI deployment (current)

```bash
cd apps/web
npx vercel        # preview
npx vercel --prod # production
```

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
