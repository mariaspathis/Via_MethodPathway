# Via Method Mapping — Clean final version

This version has no automatic email sending and no Vercel response logging.

## Final pathway screen
After the client sees their suggested Via Method pathway, the only additional section is:

**Share your pathway with Spathis Wellbeing**

The client is told that the button opens a pre-written email in their own email app. They can review it before choosing to send.

Buttons:
- Share my pathway with Spathis Wellbeing
- Back

The old section containing:
- “What would you like to do next?”
- “Print / save my response”
- the coloured sharing button
- the duplicate Book a conversation button

has been removed.

## Existing footer
The website contact button is labelled **Book a conversation**.

## Important GitHub cleanup
Before redeploying:
1. Open your GitHub repository.
2. Delete every file inside the old `api` folder.
3. Commit the deletion.
4. Delete/replace the old `index.html`.
5. Upload the new `index.html` from this package.
6. Commit the new files.
7. Confirm the `api` folder is no longer visible in the repository.
8. Vercel should redeploy automatically from GitHub.

If Vercel still shows the old final screen, open Vercel → Deployments and make sure the newest deployment is the one marked Production.
