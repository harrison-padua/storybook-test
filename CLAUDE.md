# Prototype repo

This repo is a prototype Angular app deployed to GitHub Pages. It exists so non-technical users (business analysts, designers) can iterate on UI ideas with Claude Code on the web and see results live, without running anything locally.

## What goes here

- One prototype per repo. The current prototype is a **todo list**.
- Single-page-ish Angular app, mock data only, no backend.
- Persist data with `localStorage` if needed.

## Stack

- Angular 21 standalone components, signals, control flow (`@if` / `@for`).
- Tailwind v4 + daisyUI v5 (configured in `src/styles.css` via `@plugin "daisyui"`).
- **Padua UI design language** is followed by replicating the daisyUI class patterns documented in the Padua Storybook.

> Note: the private package `@paduafg/ng-component-lib` is NOT installed in this repo. Padua's Angular wrapper components (e.g. `<ui-text-input>`) are unavailable. Use the underlying daisyUI classes documented in each Padua component's Storybook page instead.

## Rules for Claude

1. **Always consult the Padua UI Storybook MCP first.** Call `list-all-documentation`, then `get-documentation` for each component you plan to use. Never invent props, classes, or variants.
2. **Follow Padua's daisyUI class patterns exactly** as shown in each component's docs (e.g. `card bg-base-100 border border-base-300`, `btn btn-primary`, `input`, `checkbox`).
3. **Use Decision Guides** (Component Chooser, Action Buttons, Data Input Controls, Displaying Data, Feedback Mechanisms, Navigation) to pick the right component before building.
4. **Page shell:** sidebar + main, per the `PageStructure` pattern. Page background `bg-base-200`, content surfaces `bg-base-100` inside cards. No shadows.
5. **No backend, no real APIs, no auth.** Mock everything.
6. **Don't install `@paduafg/ng-component-lib`** — it's a private package and CI has no auth for it.
7. **Don't change the deploy workflow** unless asked. The site is served at `https://harrison-padua.github.io/storybook-test/`.

## Local dev

```bash
npm install
npm start    # http://localhost:4200
```

## Deploy

Pushing to branch `claude/check-storybook-access-8XZBw` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. The latest push wins — there is no per-branch preview.

**One-time GitHub setup** (must be done by a human):

- Settings → Pages → Source: **GitHub Actions**.

The deployed URL is: **https://harrison-padua.github.io/storybook-test/**
