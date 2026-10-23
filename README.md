# Franco Merzia Vino — Next.js 16

Marketing site for Franco Merzia Vino: Italian wines from Veneto and Apulia, presented for people who are new to wine.

## Stack

- **Next.js 16** (App Router, React 19, Server Components by default)
- **TypeScript** (strict)
- **CSS Modules** + a single token file (`src/app/globals.css`), no CSS framework
- **next/font** — Archivo (Latin) + Commissioner (Greek)
- **lucide-react** icons
- No animation library: CSS transitions/keyframes + small rAF/IntersectionObserver hooks

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /el or /en
npm run build && npm start
npm run typecheck
```

## Structure

```
src/
├─ app/
│  ├─ [lang]/                  # /el and /en — statically generated
│  │  ├─ layout.tsx            # <html>, fonts, Header, Footer, WineDrawerProvider
│  │  ├─ page.tsx              # Home: intro → hero ring → collection → finder → guide → wineries → gifts → contact
│  │  ├─ wines/page.tsx        # Full catalogue (search, filters, load more, URL-synced)
│  │  ├─ wines/[slug]/page.tsx # Wine detail (SSG for every wine × locale)
│  │  └─ not-found.tsx
│  ├─ actions/contact.ts       # Server Action for the enquiry form (wire to email/CRM)
│  └─ globals.css              # Design tokens, buttons, inputs, reveal utilities
├─ components/
│  ├─ layout/                  # Header, MobileMenu, LangSwitch, Footer, PageHero
│  ├─ home/                    # IntroCurtain, HeroRing, Collection, LabelGuide, Wineries, Gifts (scroll scene)
│  ├─ finder/                  # WineFinder (shared by home preview + catalogue)
│  ├─ wine/                    # WineCard (+categoryFx: per-type animations), WineDrawer(+Provider), BodyMeter
│  ├─ contact/                 # ContactSection + types
│  └─ ui/                      # Reveal / MaskHeading, Chips
├─ data/wines.ts               # ← the catalogue (single source of truth)
├─ hooks/useReducedMotion.ts
├─ lib/
│  ├─ i18n/                    # config + el/en dictionaries (typed: en must match el)
│  ├─ wines.ts                 # localize(), featured(), findWine(), filterWines()
│  └─ tones.ts                 # per-wine colour tones for the collection & detail pages
├─ types/wine.ts
└─ proxy.ts                    # Next 16 proxy (ex-middleware): locale redirect via cookie / Accept-Language
public/images/                 # bottles/<slug>.png, gifts/g01–g16.jpg, logos
```

## Adding a wine

1. Append an object to `src/data/wines.ts` (TypeScript will tell you what's required — both `el` and `en` copy).
2. Add a transparent PNG at `public/images/bottles/<slug>.png`.
3. Optional: `featured: true` to include it in the hero ring and the collection story (keep this to ~5–7).
4. Optional: a hand-tuned colour in `src/lib/tones.ts`; otherwise it's derived from body + type.

The wine gets a detail page at `/el/wines/<slug>` and `/en/wines/<slug>` automatically.

## Notes

- **Regions map:** `RegionsMap` (data in public/data/italy-regions.json, ids in lib/geo.ts). “See in the catalogue” filters the finder by region (`?region=` on /wines).
- **Finder:** home starts in “By winery” (tiles from data/wineries.ts) or “Whole catalogue”; category chips include 0% alcohol and Premium.
- **Header:** scroll progress bar, hides on scroll down. `ViewCursor` shows a round label over any `[data-view]` element.
- **Catalogue:** 64 wines — every wine with both a data sheet and a bottle photo. `body: 0` hides the body meter (no rating on the sheet).
- **Card animations:** each type has its own motion in the photo panel (sparkling bubbles, white light pools, rosé petals, red waves). Filtering by a type boosts it. Static under reduced motion.
- **Corporate gifts:** a 420vh sticky scroll scene on desktop; a swipeable photo row on phones and with reduced motion. Its button preselects “Corporate gifts” in the contact form.
- **Contact:** professionals only — enquiry type (wholesale / catalogue / gifts / other), company, name, phone-or-email, wines, message.

- **Server vs client:** pages and static sections are Server Components. Only interactive parts are client components (`'use client'`): hero ring, collection, finder, drawer, menu, contact form, reveals. Client components get `locale` and read the dictionary themselves; dictionaries contain functions, so they're never passed across the server/client boundary.
- **Quick look + full page:** clicking a wine anywhere opens the drawer (`useWineDrawer().open(slug)`); the drawer links to the full page.
- **"Ask us"** links go to `/[lang]?wine=<slug>#contact`, which pre-selects that wine in the form.
- **Catalogue filters** are kept in the URL (`?food=fish&type=white&winery=…&q=…`) so results can be shared and the home finder's "+N more" link carries its filters over.
- **Motion:** everything respects `prefers-reduced-motion`. The intro plays once per session (`sessionStorage`).
- **Contact:** `src/app/actions/contact.ts` validates on the server and currently logs. Connect it to Resend/Postmark/SMTP before launch.
- **Age gate:** not included. Add one in `[lang]/layout.tsx` if your market requires it.
