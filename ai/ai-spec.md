# AI Specification — WhoZihni Portfolio

**Student:** Ahmed Zihni  
**GitHub:** WhoZihni  
**Live URL:** https://WhoZihni.github.io  
**Last updated:** 2026-06-24

---

## 1. Project Identity & Scope

### What this site is
A personal portfolio website for Ahmed Zihni — a full-stack developer based in Tampa, FL. It serves as a professional presence: showcasing projects, providing contact information, linking to external profiles, and giving recruiters or collaborators a clear picture of Ahmed's skills and background.

### What it does
- Presents Ahmed's identity, background, and skillset (Home)
- Showcases selected projects with descriptions and links (Portfolio)
- Aggregates links to external profiles and resources (Links)
- Provides a contact form for inbound messages (Contact)
- Includes a hidden login page and a protected back-office for managing portfolio content

### Explicitly out of scope
- No custom backend or server — Supabase is the only backend infrastructure
- No SSR or Next.js — static, client-side only, deployed as a SPA
- No blog, CMS, or multi-author content
- No payment processing
- No third-party authentication providers (OAuth, Google, etc.) — Supabase email/password only

---

## 2. Architecture & Repo Structure

### Folder layout

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build + deploy to GitHub Pages
├── public/                     # Static assets served as-is
├── src/
│   ├── assets/                 # Images, icons, fonts
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── lib/
│   │   └── supabaseClient.js   # Singleton Supabase client
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Links.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── BackOffice.jsx
│   ├── App.jsx                 # Router + ProtectedRoute
│   ├── main.jsx
│   └── index.css
├── ai/
│   ├── ai-spec.md              # This file
│   └── features/               # Per-feature specification documents
├── docs/                       # Scripts, pitch feedback, written docs
├── .env                        # Local env vars — never committed
├── vite.config.js
└── package.json
```

### Branching model
- `main` — production branch, triggers GitHub Actions deploy on push
- `dev` — integration branch, all features merge here first
- `feature/*` — individual feature branches, branch off `dev`, PR back to `dev`

Flow: `feature/x` → PR → `dev` → PR → `main` → auto-deploy

---

## 3. Allowed Tech & Constraints

### Allowed
- React 18 + Vite (JavaScript, not TypeScript)
- React Router DOM v6
- Supabase JS client (`@supabase/supabase-js`)
- Plain CSS or CSS Modules — no CSS-in-JS libraries
- GitHub Actions + `peaceiris/actions-gh-pages@v3` for deploy

### Constraints
- No custom server, Express, or serverless functions
- No SSR — this is a fully static SPA
- All Supabase environment variables must use the `VITE_` prefix
- `.env` must never be committed — it is listed in `.gitignore`
- No inline styles in JSX
- No TypeScript — keep it JavaScript throughout
- Keep bundle size minimal — avoid heavy third-party UI libraries

### Environment variables
| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public API key |

Both must be set as GitHub repository secrets for the deploy workflow to inject them at build time.

---

## 4. Coding Standards & Conventions

### Naming
- **Components:** PascalCase (`Header.jsx`, `ProtectedRoute.jsx`)
- **Feature files / non-component modules:** kebab-case (`supabaseClient.js`, `contact-page.feature.md`)
- **CSS classes:** kebab-case (`nav-link`, `project-card`)
- **Variables and functions:** camelCase (`getSession`, `projectList`)

### Components
- One component per file
- Default exports for pages and components
- Props destructured at the function signature level

### Styles
- CSS Modules or plain CSS files imported alongside components
- No inline `style={{}}` attributes
- No Tailwind or styled-components

### Comments
- Only on non-obvious logic — not on self-documenting code
- No commented-out code committed to any branch

### Error handling
- Validate only at system boundaries (user input, Supabase calls)
- Log warnings to console for missing env vars — never silently fail
- Show user-facing error messages for failed form submissions or auth errors

---

## 5. Global Definition of Done

Every feature is considered complete when all of the following are true:

- [ ] Builds without error (`npm run build` exits 0)
- [ ] No console errors or warnings in the browser on any route
- [ ] Responsive on mobile (320px), tablet (768px), and desktop (1280px)
- [ ] All interactive elements are keyboard-accessible
- [ ] No hardcoded secrets or `.env` values in source code
- [ ] Feature branch merged to `dev` via PR (not pushed directly)
- [ ] Acceptance criteria in the corresponding feature spec are all met
- [ ] No unused imports, variables, or dead code
- [ ] Supabase client imported only from `src/lib/supabaseClient.js`

---

## 6. Cross-Feature Rules

These rules apply across all features without exception:

1. **Supabase client** — always import from `src/lib/supabaseClient.js`. Never call `createClient` directly in a page or component.

2. **Layout wrapping** — all public pages (Home, Portfolio, Links, Contact) must render inside `<Layout>`. Login and BackOffice render standalone — no Header or Footer.

3. **Protected routes** — any route that requires authentication must use the `ProtectedRoute` wrapper defined in `App.jsx`. It checks `supabase.auth.getSession()` on mount and redirects to `/login` if no session exists.

4. **Navigation** — the Header nav must only link to public pages (Home, Portfolio, Links, Contact). The `/login` and `/backoffice` routes are never linked from the Header.

5. **Null-safe Supabase** — always check that `supabase !== null` before calling any Supabase method. The client is `null` when env vars are missing (e.g., local dev without `.env`).
