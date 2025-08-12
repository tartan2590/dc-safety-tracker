# DC Safety & Enforcement Tracker

A stylized, single-page dashboard to track federal actions and promises for Washington, D.C.'s policing and public safety. Data is maintained in a Google Sheet and ingested via its public CSV (or the included sample CSV).

## Quick Start (Local)

1. Install Node.js 18+ (https://nodejs.org)
2. In a terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL that Vite prints (typically http://localhost:5173).

## Connect Your Google Sheet

1. Create a Google Sheet with this **header row** (exact names):

   | id | category | action | description | targetDate | timingBasis | status | lastUpdated | dependencies | windowEnd | source | notes |
   |---|---|---|---|---|---|---|---|---|---|---|---|

   - **Dates** in ISO format `YYYY-MM-DD` where possible.
   - **status**: `Not Started`, `In Progress`, `Completed`, or `Stalled`.
   - **category**: `Immediate`, `Near-term (≤1 week)`, `Short-term (no fixed date)`, `Legislation/Appointments`, `Replicable Model`.

2. File → Share → **Publish to web** → choose **Comma-separated values (.csv)** → Publish.
3. Copy the URL that ends with `output=csv`.
4. Edit `src/config.ts` and set:
   ```ts
   export const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv'
   ```
5. Save and refresh the page. Your data will load from the Sheet.

> The app ships with `public/sample.csv` so it runs immediately. Replace with your Sheet when ready.

## Deploy to GitHub Pages (Step-by-step for new users)

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name it (e.g., `dc-safety-tracker`) and click **Create repository**.

2. **Upload the project**
   - Click **Add file ▸ Upload files**.
   - Upload the *entire* folder contents from this ZIP (including hidden folders like `.github`).
   - Click **Commit changes**.

3. **Set the Pages base path**
   - In your repo, open `vite.config.ts`.
   - Replace `/REPO_NAME/` with `/<your-repo-name>/` (including both slashes). For example: `'/dc-safety-tracker/'`.
   - Commit the change (via the web editor).

4. **Enable GitHub Pages via Actions**
   - Go to **Settings ▸ Pages**.
   - Under **Build and deployment**, choose **GitHub Actions**. (The workflow is already included.)

5. **Trigger the deployment**
   - Any push to `main` triggers the Pages workflow.
   - Go to **Actions** tab → open the latest **Deploy to GitHub Pages** run → wait for ✅ Success.

6. **Open your site**
   - It will be available at `https://<your-username>.github.io/<your-repo-name>/`

## Update the Tracker

- Just edit the Google Sheet. The site fetches the CSV on every load, so updates appear on refresh.
- If you change the repo name later, update `base` in `vite.config.ts` accordingly.

## Troubleshooting

- **Blank page after deploy**: The most common cause is `base` not matching your repo name in `vite.config.ts`.
- **CORS/CSV errors**: Ensure your Google Sheet link ends with `output=csv` and is published to the web.
- **Dates show `—`**: Ensure valid ISO dates like `2025-08-11`.

## License

MIT
