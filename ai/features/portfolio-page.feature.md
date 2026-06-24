# Feature Spec: Portfolio Page

## Goal
Display Ahmed's selected projects in a clean, scannable format — giving recruiters and collaborators a clear picture of what he has built and the problems he solved.

## Scope

**In scope:**
- Grid or list of project cards
- Each card: project name, short description, tech tags, and links (GitHub + live URL where available)
- Projects data managed in the BackOffice via Supabase

**Out of scope:**
- Individual project detail pages
- Filtering or search
- Animations or carousels

---

## Requirements

1. Page renders at route `/portfolio` inside `<Layout>`.
2. On mount, fetch all projects from the Supabase `projects` table ordered by `display_order` ascending.
3. Each project card must display:
   - Project name
   - Short description
   - Tech tags (rendered as individual badge elements)
   - GitHub link (if available)
   - Live URL link (if available)
4. Show a loading state while fetching.
5. Show a user-facing error message if the Supabase fetch fails.
6. If no projects exist, show a neutral empty state (not a raw empty page).

---

## Interfaces

- **Page:** `src/pages/Portfolio.jsx`
- **Wrapped by:** `<Layout>` via `App.jsx`
- **Supabase table:** `projects`
- **Supabase client:** imported from `src/lib/supabaseClient.js`

### Supabase `projects` table schema
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | Project name |
| `description` | text | Short description |
| `tags` | text[] | Array of tech tags |
| `github_url` | text | Nullable |
| `live_url` | text | Nullable |
| `display_order` | integer | Controls card order |
| `created_at` | timestamptz | Auto-set |

---

## Data & Validations

- `supabase` must be non-null before fetching; show a configuration error if null
- Links must open in a new tab (`target="_blank"`) with `rel="noopener noreferrer"`
- Tags are displayed as-is — no transformation required
- Supabase RLS policy must allow public read access to the `projects` table

---

## Acceptance Criteria

- [ ] Navigating to `/portfolio` renders the page with Header and Footer
- [ ] Projects are fetched from Supabase and rendered as cards
- [ ] Cards display name, description, tags, and available links
- [ ] Links open in a new tab
- [ ] Loading state is visible while fetch is in progress
- [ ] Error state is shown if Supabase returns an error
- [ ] Empty state is shown if the table has no rows
- [ ] Page is responsive at 320px, 768px, and 1280px
