# Via Method Mapping — Vercel Logs version

This version does not send email and does not require Gmail, Resend, passwords or API keys.

## How submissions are recorded
When a client chooses **Yes, save my response** and submits, the browser sends the 48 answers to `/api/record-response`. The Vercel Function recalculates the two map scores and pathway, then writes one structured `VIA_RESPONSE` entry to Vercel Runtime Logs.

## Where to view submissions
1. Open the Vercel dashboard and select this project.
2. Open **Logs**.
3. Search for `VIA_RESPONSE`.
4. Open an entry to view the timestamp, pathway, scores, optional contact details, and all 48 numeric responses.

## Important
Vercel Runtime Logs are operational logs, not a permanent client-record database. Availability and retention depend on Vercel's current logging plan/settings. Export anything you need to retain.

## Deployment
Upload all files to the GitHub repository connected to Vercel. Ensure the `api/record-response.js` file is present at the repository root under `api/`. Vercel will redeploy from GitHub. No environment variables are required.
