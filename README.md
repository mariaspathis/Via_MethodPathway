# Via Method Mapping — Spathis Wellbeing

Static Via Method Mapping quiz with a Vercel serverless email endpoint.

## Files

- `index.html` — quiz, scoring and pathway recommendation display
- `api/send-response.js` — sends consented quiz responses by email
- `package.json` — project metadata
- `.gitignore`

## Pathway logic

- Grounded Support: Support Map score >= 36
- The Unfolding: Support Map score < 36 AND Identity Map score >= 36
- The Way Forward: Support Map score < 36 AND Identity Map score < 36

## Email destination

All consented quiz response emails are sent to:

`contact@spathiswellbeing.com`

The email contains the recommended pathway, Support Map score, Identity Map score, optional contact details, and all 48 numeric responses.

## Vercel setup

1. Upload this project to GitHub and import the repository into Vercel.
2. Create a Resend account/integration and obtain an API key.
3. In Vercel, open **Project → Settings → Environment Variables**.
4. Add `RESEND_API_KEY` with your Resend API key.
5. Recommended for production: verify `spathiswellbeing.com` in Resend, then add:
   `EMAIL_FROM=Via Method <responses@spathiswellbeing.com>`
6. Redeploy the Vercel project after adding or changing environment variables.

The API key must never be placed in `index.html` or committed to GitHub.
