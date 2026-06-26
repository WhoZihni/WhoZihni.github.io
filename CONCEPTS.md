# Challenging Concepts

## Concept 1: Supabase Row Level Security (RLS)

**Purpose in project:** The `messages` table stores contact form submissions. RLS policies ensure that anonymous visitors can only INSERT rows (submit a message) — they cannot read or delete any messages. Only an authenticated admin session can SELECT or DELETE.

**Why it was challenging:** RLS lives entirely in the Supabase dashboard as PostgreSQL policies, not in application code. It's easy to accidentally leave a table fully open (no policies = no access) or fully locked (INSERT blocked too). The anon role INSERT policy needed to be written carefully so it only allows the specific columns the form submits, while rejecting any attempt to query the table data.

**File / location:**
- `src/pages/Contact.jsx` — INSERT to `messages` table using the anon key (line ~63)
- `src/pages/BackOffice.jsx` — SELECT and DELETE from `messages` using authenticated session (lines ~107, ~121)
- Supabase dashboard → Authentication → Policies → `messages` table

---

## Concept 2: React Router Protected Routes with Session Checking

**Purpose in project:** The `/backoffice` route must redirect unauthenticated visitors to `/login`. The `/login` route must redirect already-authenticated users to `/backoffice`. This prevents both unauthorized access and redundant login screens.

**Why it was challenging:** Supabase's `getSession()` is asynchronous, which means the component initially renders before the session status is known. Rendering a redirect before knowing the answer would flash the wrong page. The solution is a three-state model: `undefined` (loading), `null` (no session), or a session object. While the state is `undefined`, the component renders nothing (`return null`) to block any premature redirect.

**File / location:**
- `src/App.jsx` — `ProtectedRoute` component (lines 12–25)
- `src/pages/Login.jsx` — session check on mount with redirect to `/backoffice` if session exists (lines ~14–20)

---

## Concept 3: GitHub Actions CI/CD Deployment to GitHub Pages

**Purpose in project:** Every push to `main` automatically builds the Vite app and deploys the `dist/` output to GitHub Pages — no manual upload or FTP involved.

**Why it was challenging:** GitHub Pages normally serves from the repo root or a `/docs` folder, not from a build artifact. The `peaceiris/actions-gh-pages` action works around this by force-pushing the build output to a separate `gh-pages` branch that GitHub Pages is configured to serve. Getting this to work required: setting the correct `publish_dir`, configuring a `CNAME` or base path for the router, and ensuring the GitHub Pages source branch was set to `gh-pages` in the repo settings. React Router also required a 404.html redirect hack so deep links (e.g. `/portfolio`) resolve correctly on the static host.

**File / location:**
- `.github/workflows/deploy.yml` — full CI/CD pipeline definition
- `vite.config.js` — `base` path configuration for GitHub Pages
