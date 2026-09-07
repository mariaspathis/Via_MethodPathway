# Via Method Mapping — build notes

## Current configuration

- 48 questions across Support Map and Identity Map.
- Response scale: 0–3.
- Pathway thresholds are implemented at 36 points.
- All consented submissions call `/api/send-results`.
- Results are sent to `contact@spathiswellbeing.com`.
- If a person selects "Discard my response", no email request is made.
- The results email includes pathway, both map scores, optional contact details, and all numeric answers.

## Required Vercel environment variable

`RESEND_API_KEY`

For a branded production sender, also configure `EMAIL_FROM` after verifying the Spathis Wellbeing domain with the email provider.
