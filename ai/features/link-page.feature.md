# Feature Spec: Links Page

## Goal
Provide a single, curated page of links to Ahmed's external profiles, social accounts, and notable resources — making it easy for visitors to find him anywhere on the web.

## Scope

**In scope:**
- List of categorized or ungrouped links (label + URL)
- Links managed in the BackOffice via Supabase
- Optional: icon or category label per link

**Out of scope:**
- Link analytics or click tracking
- QR codes
- Social media embeds or previews

---

## Requirements

1. Page renders at route `/links` inside `<Layout>`.
2. On mount, fetch all links from the Supabase `links` table ordered by `display_order` ascending.
3. Each link entry must display:
   - Label (e.g., "GitHub", "LinkedIn", "Arvynna AI")
   - Clickable URL opening in a new tab
   - Optional: category label (e.g., "Social", "Projects")
4. Show a loading state while fetching.
5. Show a user-facing error message if the fetch fails.
6. If no links exist, show a neutral empty state.

---

## Interfaces

- **Page:** `src/pages/Links.jsx`
- **Wrapped by:** `<Layout>` via `App.jsx`
- **Supabase table:** `links`
- **Supabase client:** imported from `src/lib/supabaseClient.js`

### Supabase `links` table schema
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `label` | text | Display name |
| `url` | text | Full URL |
| `category` | text | Nullable — e.g., "Social", "Projects" |
| `display_order` | integer | Controls render order |
| `created_at` | timestamptz | Auto-set |

---

## Data & Validations

- `supabase` must be non-null before fetching
- All URLs must open with `target="_blank"` and `rel="noopener noreferrer"`
- Supabase RLS policy must allow public read access to the `links` table

---

## Acceptance Criteria

- [ ] Navigating to `/links` renders the page with Header and Footer
- [ ] Links are fetched from Supabase and rendered in order
- [ ] Each link is clickable and opens in a new tab
- [ ] Loading state is visible during fetch
- [ ] Error state is shown on Supabase failure
- [ ] Empty state is shown if no rows exist
- [ ] Page is responsive at 320px, 768px, and 1280px
