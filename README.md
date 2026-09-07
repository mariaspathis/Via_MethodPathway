# Via Method Mapping — Spathis Wellbeing

A static, single-page Via Method reflection tool styled for Spathis Wellbeing. No framework or build step is required; the quiz runs from `index.html`.

## Files

- `index.html` — complete 48-question quiz, pathway scoring, results screen and contact fields
- `NOTES.md` — scoring logic and implementation notes
- `package.json` — project metadata

## Pathway scoring

- **Grounded Support:** Support Map score ≥ 36
- **The Unfolding:** Support Map score < 36 and Identity Map score ≥ 36
- **The Way Forward:** Support Map score < 36 and Identity Map score < 36

## Upload to GitHub

1. Create a repository at GitHub.
2. Upload `index.html`, `NOTES.md`, `README.md`, and `package.json`.
3. Commit the files to `main`.

## Connect GitHub to Vercel

1. In Vercel, choose **Add New → Project**.
2. Import the GitHub repository.
3. Use **Framework Preset: Other**.
4. Leave the Build Command blank.
5. Leave the Output Directory as the project root/default.
6. Deploy.

Every later push to the connected GitHub branch will trigger a new Vercel deployment automatically.

## Data submission

The front-end currently prepares the response payload locally. If you want responses emailed or stored in Airtable/Google Sheets, add a Vercel serverless/API endpoint and connect `submitForm()` to it.
