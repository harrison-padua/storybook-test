# How to create a new prototype

## Step 1 — Set this repo up as a template *(one time, you)*
- GitHub → `harrison-padua/storybook-test` → **Settings** → tick **"Template repository"**.

## Step 2 — Create your new prototype repo *(you)*
- GitHub home → **+** (top right) → **"New repository from template"** → choose `storybook-test`.
- Name it for the prototype, e.g. `expense-tracker`.
- Owner: pick your account or org. Public is easiest (private Pages needs a paid plan).
- Click **Create repository from template**.

## Step 3 — Configure GitHub Pages *(you, ~30 seconds)*
On the new repo:
1. **Settings → Pages** → under "Build and deployment", set **Source = GitHub Actions**.
2. **Settings → Environments → `github-pages`** → "Deployment branches and tags" → choose **"All branches"** (or add your working branch pattern).

## Step 4 — Open Claude Code on the web *(you)*
- Point Claude at your new repo.
- It will create its own branch automatically (e.g. `claude/abc123`).

## Step 5 — Update the deploy workflow for the new branch *(Claude, on your instruction)*
The workflow currently triggers on `claude/check-storybook-access-8XZBw`. Tell Claude in your first message:

> "Update `.github/workflows/deploy.yml` to deploy on push to whatever branch you're working on."

Claude will edit the workflow accordingly. *(Skip this step if you change the template to deploy from `main`.)*

## Step 6 — Describe the prototype *(you)*
Give Claude a plain-English brief. Useful things to say:
- **What it is**: "An expense tracker for a small team."
- **Who uses it**: "Office manager logging receipts."
- **Main screens / actions**: "Add expense, list by category, monthly total."
- **Data fields**: "amount, category, date, payer, note."

You don't need to mention Angular, Padua, daisyUI, or components — `CLAUDE.md` handles that.

## Step 7 — Claude builds it *(Claude)*
Claude will:
- Look up Padua UI components in the Storybook MCP.
- Replace the todo list with your feature.
- Update the sidebar navigation.
- Mock the data (no backend) and persist to `localStorage`.
- Commit and push.

## Step 8 — Wait for the deploy *(you, ~2 minutes)*
- Go to the **Actions** tab on the new repo.
- Watch the "Deploy prototype to GitHub Pages" workflow run.
- When it's green, your prototype is live at:
  **`https://<your-username>.github.io/<repo-name>/`**
- Bookmark this URL. It never changes — every new push updates the same page.

## Step 9 — Iterate *(you ↔ Claude)*
For every change:
1. **You**: Tell Claude what you want changed in plain English. *("Add a date picker", "Make the totals bigger", "Add a delete confirmation".)*
2. **Claude**: Edits, commits, pushes.
3. **You**: Wait ~2 min, refresh the URL.
4. Repeat.

## Step 10 — Hand off *(you, when it's "done")*
The live URL is the deliverable. Share it in Slack, a ticket, a design review — wherever. Source is on GitHub if engineering wants to use it as a reference.

---

## Things to know

- **Single live preview**: The latest push wins. If two people push at once, the second overwrites the first's preview. Coordinate, or ask Claude for a per-branch setup if needed.
- **No real data, no backend, no auth**: Prototypes are throwaway by design.
- **Padua components only**: Claude is instructed to use Padua patterns. If you see something off-brand, tell Claude — it can re-check the Storybook docs.
- **Things only you can do**: enable Pages, change environment rules, rename/delete the repo, approve PRs (if you adopt that model).

---

## Common problems

| What you see | Fix |
|---|---|
| "Branch not allowed to deploy" | Settings → Environments → `github-pages` → allow your branch |
| URL gives a 404 | Settings → Pages → Source = **GitHub Actions** |
| Workflow stuck queued | Wait — only one deploy runs at a time |
| New change not visible | Hard refresh (Cmd/Ctrl-Shift-R), or check Actions tab |
| Workflow fails on `npm ci` | Tell Claude: "remove the private Padua package" |
