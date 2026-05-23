# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Maystine is a personal portfolio website for a World of Warcraft addon developer and Twitch streamer. It showcases addon profiles that can be imported into WoW and embeds a live Twitch stream.

## Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Framework:** Next.js 14 App Router with TypeScript and Tailwind CSS. Path alias `@/*` maps to `./src/*`.

**Data source:** `data/addons.json` — the single source of truth for addon metadata. Each addon entry contains name, description, a WoW class color, and an array of profiles (each profile has a name, associated class, and an importable string).

**Page structure:**
- `src/app/layout.tsx` — Root layout wrapping all pages with `<Navbar>` and `<MiniTwitchPlayer>`
- `src/app/page.tsx` — Home page: hero section + full Twitch embed (player + chat)
- `src/app/addons/page.tsx` — Grid of `<AddonCard>` components mapped from `addons.json`
- `src/app/parcours/page.tsx` — Placeholder page (currently "en construction")

**Key components:**
- `Navbar.tsx` — Client component (uses `usePathname`); fixed top bar with nav links and Twitch button
- `MiniTwitchPlayer.tsx` — Client component; sticky bottom-right Twitch widget with minimize toggle; hidden on the home page (the full embed is shown there instead)
- `AddonCard.tsx` — Client component; renders an addon card that opens a modal for profile selection and copy-to-clipboard of the import string; uses WoW class colors per profile

**Styling approach:** Inline styles are used throughout (not Tailwind utility classes in JSX). CSS variables and custom keyframe animations (`fadeUp`, `glowPulse`, `float`) are defined in `src/app/globals.css`. The color scheme centers on dark purple (#080810 bg, #7c3aed/#a855f7 accents). Tailwind config extends with custom colors and fonts (Cinzel, Inter) but is mainly used for reset/base styles.

**Twitch integration:** The Twitch iframe `parent` parameter is hardcoded to the Vercel deployment domain. Update this in both `page.tsx` and `MiniTwitchPlayer.tsx` if the domain changes.

**Remote images:** `next.config.mjs` allows image optimization from any HTTPS hostname (`**`).
