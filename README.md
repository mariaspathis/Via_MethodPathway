# Via Method Mapping

This version does not automatically email, transmit, or save a client's reflection.

## Client experience
1. Complete the 48-statement reflection.
2. See the suggested Via Method pathway immediately on screen.
3. Choose to:
   - Print / save the response using the browser's print dialog.
   - Share the pathway with Spathis Wellbeing. This opens the client's own email app with a pre-written email addressed to contact@spathiswellbeing.com. The client must press Send themselves.
   - Book a conversation.

## Important
There is no Resend, Gmail SMTP, API key, App Password, Vercel email function, or Vercel response logging in this version.

The Share button uses a `mailto:` link. Whether it opens successfully depends on the client having an email application or browser mail handler configured.

## Deployment
Upload these files to the GitHub repository connected to Vercel. Remove any old `/api` email or logging files from the repository, then redeploy.
