# Nilesh Thakur's Portfolio!

My personal site, live at **https://nilesh-thakur.vercel.app/**

It's a Next.js app with Notion as the CMS. Projects, "now" items, log entries, and photos all live in Notion databases and get pulled in at build/request time. This means the site is updated via Notion.

## Stack

- **Next.js 16** (App Router, React Server Components, `cacheComponents`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) alongside CSS variables in `app/globals.css`
- **Notion API** (`@notionhq/client`) as the content source
- Deployed on **Vercel**

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero, current "now" items, and a timeline of recent log activity |
| `/now/[id]` | Detail view for a single now item with its full log history |
| `/projects` | All projects, featured ones sorted first |
| `/photos` | Photo grid with modal viewer |

## Getting started

```bash
npm install
```

Create a `.env.local` in the project root:

```
NOTION_TOKEN=secret_xxx
NOTION_PROJECTS_DB=xxx
NOTION_NOW_DB=xxx
NOTION_LOG_DB=xxx
NOTION_PHOTOS_DB=xxx
```

`NOTION_TOKEN` is an internal integration token from [notion.so/my-integrations](https://www.notion.so/my-integrations). Each database has to be explicitly shared with that integration, otherwise the queries come back empty. The DB ids are the 32-character hashes in each database's URL.

Then:

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Notion schema

The property names below are what `lib/notion.ts` and the page components read. Renaming a property in Notion silently drops the field (everything falls back to empty), so keep these in sync.

**Projects** (`NOTION_PROJECTS_DB`): `Name` (title), `Tagline`, `Description`, `Tags` (multi-select), `Category` (select), `Status` (select), `Link` (url), `GitHub` (url), `Featured` (checkbox), `Date`

**Now** (`NOTION_NOW_DB`): `Name` (title), `Tagline`, `Description`, `Category` (select: `engineering` / `cooking` / `personal`), `Progress` (number), `Status` (select, only `active` items are shown), `Started` (date)

**Log** (`NOTION_LOG_DB`): `Entry` (rich text), `Type` (select: `win` / `struggle` / `note`), `Date`, `Now Item` (relation → Now)

**Photos** (`NOTION_PHOTOS_DB`): `Name` (title), `Caption`, `Location` (rich text or select), `Date`, `Featured` (checkbox), `Photo` (files, though `Image` or `File` also work)

## Data fetching

All Notion queries live in `lib/notion.ts` and use Next's `'use cache'` directive with cache tags, so pages don't hammer the Notion API:

- `projects`, `now`, `logs`: `cacheLife('minutes')`
- `photos`: 30 min revalidate, 50 min expire

The photos window is deliberately short. Notion serves uploaded files as S3 URLs signed with `X-Amz-Expires=3600`, so any cache entry older than an hour hands the browser links that 403, and the grid renders blank tiles. Keeping `expire` under 60 minutes guarantees the URLs are still live when they reach a visitor. If you ever want longer caching here, switch the Notion property to external image links (those don't expire) or proxy the images through a route handler that resolves a fresh URL per request.

## Structure

```
app/
  page.tsx            home: now items + activity timeline
  layout.tsx          root layout, metadata, Inter font
  globals.css         CSS variables + base styles (dark theme)
  now/[id]/page.tsx   now item detail
  projects/page.tsx
  photos/page.tsx
  components/         Nav, Hero, Now, Projects, Photos, PhotosGrid, Contact, Footer
lib/
  notion.ts           all Notion queries
```

## Deployment

Pushes to `main` deploy automatically on Vercel. The five `NOTION_*` variables need to be set in the Vercel project settings too, since they aren't read from `.env.local` in production.
