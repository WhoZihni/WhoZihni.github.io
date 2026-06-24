# Feature Spec: Back Office

## Goal
Give Ahmed a private, authenticated admin panel to manage portfolio content — adding, editing, and deleting projects and links without touching the codebase.

## Scope

**In scope:**
- Authenticated-only access (redirect to `/login` if no session)
- CRUD for `projects` table
- CRUD for `links` table
- Logout button

**Out of scope:**
- Managing contact form submissions (read-only view can be added later)
- Rich text editor for descriptions
- Image upload (URL input only for now)
- Role-based access — single admin only

---

## Requirements

1. Page renders at route `/backoffice` — standalone, no Header or Footer.
2. Route is wrapped in `ProtectedRoute` in `App.jsx` — unauthenticated users are redirected to `/login`.
3. On mount, fetch all rows from `projects` and `links` tables.
4. **Projects management:**
   - List all projects with name and description
   - Add new project via inline form (name, description, tags, github_url, live_url, display_order)
   - Edit existing project (same fields)
   - Delete project with a confirmation step (e.g., confirm dialog or confirm button state)
5. **Links management:**
   - List all links with label and URL
   - Add new link (label, url, category, display_order)
   - Edit existing link
   - Delete link with confirmation
6. **Logout:** button calls `supabase.auth.signOut()` and redirects to `/login`.
7. Show loading state during fetches and mutations.
8. Show error feedback if any Supabase operation fails.

---

## Interfaces

- **Page:** `src/pages/BackOffice.jsx`
- **No Layout wrapper**
- **Protected by:** `ProtectedRoute` in `App.jsx`
- **Supabase tables:** `projects`, `links`
- **Supabase auth:** `supabase.auth.signOut`
- **Supabase client:** imported from `src/lib/supabaseClient.js`

---

## Data & Validations

### Projects form validation
| Field | Rule |
|---|---|
| `name` | Required |
| `description` | Required |
| `tags` | Optional — comma-separated string converted to array on save |
| `github_url` | Optional — must be a valid URL if provided |
| `live_url` | Optional — must be a valid URL if provided |
| `display_order` | Required — integer |

### Links form validation
| Field | Rule |
|---|---|
| `label` | Required |
| `url` | Required — must be a valid URL |
| `category` | Optional |
| `display_order` | Required — integer |

- Supabase RLS must restrict all write operations to authenticated users
- Delete must not be reversible — show a clear confirmation before executing

---

## Acceptance Criteria

- [ ] Unauthenticated visit to `/backoffice` redirects to `/login`
- [ ] Authenticated user sees the back office with no Header or Footer
- [ ] All existing projects are listed on load
- [ ] New project can be added and appears in the list without a full page reload
- [ ] Existing project can be edited and changes persist in Supabase
- [ ] Project can be deleted after confirmation and is removed from the list
- [ ] Same add/edit/delete behavior verified for links
- [ ] Logout button signs the user out and redirects to `/login`
- [ ] Loading and error states are visible for all async operations
