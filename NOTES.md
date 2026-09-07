# Via Method — client-controlled sharing

Updates in this version:
- Removed the Print / Save response button.
- Removed the extra Book a conversation button from the final pathway screen.
- Changed the existing website contact button label to **Book a conversation**.
- Changed the sharing button to **Send to Spathis Wellbeing**.
- The Send to Spathis Wellbeing button is uncoloured/outline style.
- Button text is centred.
- Nothing is automatically emailed, transmitted, logged, or saved.
- The Send to Spathis Wellbeing button opens the client's own email app with a pre-written message.
- The client controls whether the email is actually sent.
- The email contains the suggested pathway only, not all 48 answers.

## GitHub cleanup
Delete the old `api` folder contents in GitHub before redeploying:
1. Open the repo.
2. Open `api`.
3. Delete `record-response.js` or `send-response.js`.
4. Commit the deletion.
5. Delete any remaining files in `api`.
6. The folder disappears once empty.
