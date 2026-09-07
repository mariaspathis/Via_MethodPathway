# Via Method Mapping — Spathis Wellbeing

A static, single-page rebuild of the Via Method Mapping reflection tool (currently on Tally), styled to match spathiswellbeing.com. No build step, no framework — just `index.html`.

Before doing anything else, read **NOTES.md** — it lists what's confirmed real content versus draft copy/logic still pending Maria's sign-off. Nothing here should go live to real clients until those items are resolved.

## What's in this folder

- `index.html` — the whole site (all 48 questions, both parts, results screen, contact form)
- `NOTES.md` — confirmed vs draft content, open questions
- `package.json` — minimal metadata; also where a serverless function's dependencies (e.g. an email API) would get added later
- `.gitignore` — standard excludes

## Option A — GitHub's web uploader (no git required)

1. Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `spathis-via-method`). Public or private both work fine with Vercel's free tier.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in `index.html`, `NOTES.md`, `package.json`, and `.gitignore` from this folder.
4. Scroll down and click **Commit changes**.

## Option B — git command line

```bash
cd spathis-via-method
git init
git add .
git commit -m "Initial Via Method Mapping preview"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/spathis-via-method.git
git push -u origin main
```

## Connecting to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login is easiest).
2. Click **Import** next to the `spathis-via-method` repo. If it's not listed, click **Adjust GitHub App Permissions** and grant Vercel access to it.
3. On the configuration screen:
   - **Framework Preset:** Other
   - **Build Command:** leave blank
   - **Output Directory:** leave as default (root)
4. Click **Deploy**. It should finish in under a minute.
5. Vercel gives you a live URL like `spathis-via-method.vercel.app`. Every future push to `main` redeploys automatically.

### Custom domain (optional, later)

In the Vercel project → **Settings → Domains**, you can point a subdomain at it (e.g. `via.spathiswellbeing.com`) once Maria's ready to go live — that just needs a CNAME record added wherever her domain's DNS is managed.

## Before this goes live to real clients

See NOTES.md in full, but at minimum:

- Replace the draft scoring logic with Maria's real Tally rule
- Replace the draft "Unfolding" / "Way Forward" result copy with her exact wording
- Self-host the logo and photography instead of hotlinking Tally's/Squarespace's CDN
- Decide on Airtable vs Google Sheets + email provider, then add the corresponding serverless function(s) under `/api`
