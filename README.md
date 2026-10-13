# Flok - Landing Page

Public landing for **[flok.ist](https://flok.ist)**.

## Layout

| Path | Role |
|---|---|
| **Repo root** | Static GitHub Pages export (what flok.ist serves). Keep `CNAME` = `flok.ist`. |
| **`source/`** | Next.js source (edit here, then export and publish to root). |

## Dev

```bash
cd source
bun install
bun run dev
```

## Publish to flok.ist

```bash
cd source
NEXT_PUBLIC_SITE_URL=https://flok.ist/ bun run build:pages
# Copy contents of source/out/ into repo root (preserve CNAME + .nojekyll), then commit & push main.
```

GitHub Pages: `main` branch, `/` (root). Custom domain: `flok.ist`.
