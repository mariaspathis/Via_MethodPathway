# Via Method Mapping

This version does not automatically email, transmit, or save a client's reflection.

## Client experience
1. Complete the 48-statement reflection.
2. See the suggested Via Method pathway immediately on screen.
3. Choose **Share my pathway with Spathis Wellbeing** to open the client's own email app with a pre-written email addressed to contact@spathiswellbeing.com.
4. The client must press Send themselves.
5. The existing website contact button is labelled **Book a conversation**.

## Important
There is no Resend, Gmail SMTP, API key, App Password, Vercel email function, or Vercel response logging in this version.

The Share my pathway with Spathis Wellbeing button uses a `mailto:` link. Whether it opens successfully depends on the client having an email application or browser mail handler configured.

## Remove the old API folder from GitHub
Before redeploying, remove the old API email/logging code from your GitHub repository:

1. Open your GitHub repository.
2. Click the `api` folder.
3. Open the file inside it, such as `record-response.js` or `send-response.js`.
4. Click the trash/bin icon, or use the `...` menu and choose **Delete file**.
5. Click **Commit changes**.
6. If there is more than one file inside `api`, delete each one.
7. Once the last file is deleted, the empty `api` folder disappears automatically.

Your repository should then contain the main files such as:
- `index.html`
- `package.json`
- `README.md`
- `NOTES.md`

## Deployment
Upload/replace the files in the GitHub repository connected to Vercel, then let Vercel redeploy the latest commit.
