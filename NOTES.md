# Via Method — client-controlled Via Map sharing

This version:
- Does not automatically email or save responses.
- Shows the client's suggested Via Method pathway on screen.
- Lets the client choose whether to share a concise Via Map with Spathis Wellbeing.
- Opens the client's own email app; the client reviews the email and presses Send themselves.
- The email includes:
  - Suggested pathway
  - Six Support Map area scores (each out of 12)
  - Support Map total (out of 72)
  - Six Identity Map area scores (each out of 12)
  - Identity Map total (out of 72)
  - Blank Name and Phone fields
- It does not include all 48 individual answers.
- The existing “contact us” wording in the pathway card is changed to “book a conversation”.
- No Gmail SMTP, Resend, API key, App Password, Vercel API endpoint, or Vercel logging is used.

## GitHub cleanup
Delete every file inside the old `api` folder in GitHub and commit the deletion. Once empty, GitHub removes the folder automatically. Replace the old `index.html` with the new one from this package, commit, and allow Vercel to redeploy.
