# Via Method Mapping — Gmail/Vercel version

This version sends consented Via Method responses directly through the existing Gmail / Google Workspace account. Resend is not used.

## Files
- `index.html` — the reflection tool
- `api/send-response.js` — Vercel serverless function that emails responses through Gmail
- `package.json` — installs Nodemailer

## Vercel environment variables
Add these under **Project → Settings → Environment Variables**:

- `GMAIL_USER` = `contact@spathiswellbeing.com`
- `GMAIL_APP_PASSWORD` = the 16-character Google App Password created for this integration

Do not use the normal Gmail password and do not place either value in GitHub or `index.html`.

After adding or changing environment variables, redeploy the Vercel project.

## Google requirement
Google App Passwords require 2-Step Verification to be enabled. If the App Password option is unavailable on a managed Google Workspace account, the Workspace administrator may need to allow it, or Gmail OAuth 2.0 can be used instead.

## Email flow
Client consents and submits → `/api/send-response` → Gmail SMTP → `contact@spathiswellbeing.com`.

If the client supplies an email address, the received email uses that address as Reply-To so replying from Gmail goes back to the client.

## Pathway logic
- Support Map >= 36 → Grounded Support
- Support Map < 36 and Identity Map >= 36 → The Unfolding
- Support Map < 36 and Identity Map < 36 → The Way Forward

The server recalculates the scores and pathway from all 48 submitted responses before sending the email.
