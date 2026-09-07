# Via Method Mapping — build notes

## What's confirmed and real in this preview

- All 48 questions, exact wording, across both parts and all 12 domains — sourced from your uploaded Tally screenshots.
- Intro screen copy (purpose, process, response scale) — from the live Tally form.
- "Grounded Support" result copy (Focus / body / "What this means") — sourced verbatim from your `VIA_METHOD_MAPPING2.pdf` screenshot.
- Contact capture fields (Name, Email, Phone) and the consent question wording — sourced verbatim from the same screenshot.
- All three pathway names, focus tags, and "this may be for you if" framing — sourced from `Support_Options` page.
- Colour palette — sampled directly from pixel data in your uploaded PDFs (not eyeballed):
  - Terracotta `#C06A44`
  - Blue-mist `#E1EAF0`
  - Near-white `#FAFDFF`
  - Sage `#E2EFDD`
  - Gold `#DCBF64`
- Body/nav font — confirmed via embedded font names in your PDFs: Helvetica Neue / Arial. Used as a system font stack (renders as real Helvetica Neue on Mac/iOS, a close match elsewhere — no font license needed).
- CTA links point to your real Book Session (Zanda Health portal) and Contact page URLs.

## What's still draft or missing — needs your/Maria's input

1. **Scoring logic (the big one).** I only have one worked example (a submission that resolved to "Grounded Support"). I don't have the actual rule Tally uses to route someone to Grounded Support vs. The Unfolding vs. The Way Forward. I've built a transparent placeholder rule (documented in a code comment above `computePathway()` in `index.html`) so the preview has something to demonstrate — but it is **not verified** and must not go live as-is. If Maria can open the form in Tally and look at its Logic / Calculated Fields settings, that's the most reliable source for the real rule.

2. **Result copy for "The Unfolding" and "The Way Forward."** I only have the exact result-page text for Grounded Support. For the other two, I wrote draft paraphrases based on the Support Options page copy, clearly flagged in the UI with an amber "Draft copy" tag. These need Maria's real wording (or her sign-off that the draft is fine to use).

3. **Post-submission confirmation copy.** I don't have what the real form shows after submit — I wrote a simple placeholder ("Thank you — your results have been sent").

4. **Font for headlines.** The display serif in your PDFs is embedded as `ItemsText-CondensedRegular`, which is a Squarespace-internal font name, not a public font family I can licence or match exactly. I've used Newsreader (a free Google Font) as a close visual approximation. If Maria can check Design → Fonts in Squarespace for the actual font pack name, I can match it precisely.

5. **Images.** The preview hotlinks your logo mark and could hotlink your homepage photography directly from Tally's/Squarespace's CDN. For the real production build, it's more reliable to have Maria export the actual image files so we self-host them rather than depending on someone else's CDN staying put.

6. **Data handling — needs a decision:**
   - Email: who receives results (Maria's inbox — need the address), and does the person filling out the form also get a copy?
   - Storage: Airtable or Google Sheets? Airtable is quicker to wire up (just an API key + base ID). Google Sheets needs a Google Cloud service account. Once you tell me which, I'll build the Vercel serverless function for it.
   - Email sending: I'd suggest Resend (simple API, works well on Vercel) unless you already have a provider in mind.

7. **"Pathway Result: X" line** shown on the real Tally results screen looks like it may be an internal/debug field rather than something meant for the client to see. Worth confirming with Maria whether that should be visible on the live version.

## How to preview

Open `index.html` directly in a browser — it's fully interactive (all 48 questions, both parts, draft scoring, results screen, contact form). Nothing is sent anywhere yet; open the browser console to see what the submission payload would look like.

## Next steps once the above is confirmed

- Swap in real result copy and scoring logic
- Self-host real images
- Add the Vercel serverless function(s) for email + Airtable/Sheets
- Push to GitHub, connect to Vercel
