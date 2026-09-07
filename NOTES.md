# Via Method Mapping — build notes

## Current build

- All 48 questions are included across both parts and all 12 domains.
- The response scale is 0–3.
- Part One produces the **Support Map score**.
- Part Two produces the **Identity Map score**.
- Pathway routing uses the confirmed threshold logic below.
- Brand colours: `#C06A44`, `#E1EAF0`, `#FAFDFF`, `#E2EFDD`, `#DCBF64`.
- Typography uses the Spathis Wellbeing system stack: Helvetica Neue / Helvetica / Arial.
- The “Spathis” wordmark in the top-left is non-italic.
- CTA links point to the Spathis Wellbeing booking portal and Contact page.

## Pathway logic

1. **Grounded Support**
   - If **Support Map score is 36 or higher**.

2. **The Unfolding**
   - If **Support Map score is under 36** AND **Identity Map score is 36 or higher**.

3. **The Way Forward**
   - If **Support Map score is under 36** AND **Identity Map score is under 36**.

This makes The Way Forward the closest-fit fallback when neither of the first two thresholds is triggered.

## Deployment

The site is static and can be deployed directly to Vercel from GitHub with no build command.

## Data submission

The current front-end creates the submission payload in the browser. A serverless/API integration is still required if responses are to be emailed or stored externally.
