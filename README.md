# goen.com — landing page (Variant B "Signal")

Next.js (App Router, TypeScript, plain CSS) build of `Goen Landing B - Signal.dc.html`
from Claude Design. Deployed on Vercel from `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Environment

Set these in `.env.local` locally and in the Vercel project (never commit them):

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | goen-lp project URL |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_…`), not the publishable key — `signups` has RLS with no policies |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for OG/meta links |

## Layout

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Every section, top to bottom: header, hero, overview + orbit, the shift, product rail, stories, FAQ, waitlist, footer |
| `app/globals.css` | Design tokens and all styles, grouped by section |
| `lib/content.ts` | All copy and data: shift words, product cards, testimonials, FAQ, orbit layout |
| `components/ScrollEffects.tsx` | One rAF scroll handler: header pill, reveals, hero zoom, CTA parallax, word fill, horizontal rail |
| `components/Faq.tsx` | Single-open accordion |
| `components/Waitlist.tsx` | Waitlist form; posts to `/api/waitlist` |
| `app/api/waitlist/route.ts` | Validates and upserts `{ name, email }` into Supabase `signups` (honeypot field `company`) |
| `lib/supabase.ts` | Server-only Supabase client using the secret key |
| `public/img/` | WebP exports of the handoff images; avatars pre-cropped to 320px squares |

## Notes

- **Waitlist** writes to the `signups` table in the Supabase project "goen-lp" (same table
  the `Goen-events/goen` app uses). Duplicate emails upsert, so re-joining still shows success.
- **Placeholder links** in the footer (About, Careers, socials, Privacy, Terms) point to `#`.
- **Testimonials and the "1,000+ people" figure** are copy from the design, not real data.
- Reduced motion turns off reveals, zoom, parallax and card scaling, and shows the shift text fully filled.
