# Via Method Mapping — deployment notes

- Resend has been removed.
- Consented submissions call `/api/send-response`.
- The Vercel function sends through Gmail/Google Workspace using Nodemailer.
- Required Vercel variables: `GMAIL_USER` and `GMAIL_APP_PASSWORD`.
- Never commit the Gmail App Password to GitHub.
- Client-facing wording uses “response” rather than “result/results.”
- The server validates all 48 answers and recalculates the pathway before emailing.
