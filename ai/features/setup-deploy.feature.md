# Feature Spec: Setup & Deploy

## Goal
Establish the project foundation: Vite + React scaffolding, environment variable handling, and automated deployment to GitHub Pages on every push to `main`.

## Scope

**In scope:**
- Vite config with `base: '/'`
- GitHub Actions workflow (push to `main` → build → deploy)
- `.env` structure and `.gitignore` rules
- Supabase env var injection at build time via GitHub secrets

**Out of scope:**
- Custom domain configuration
- Preview deploys on PRs
- Any runtime server or API layer

---

## Requirements

1. `vite.config.js` must set `base: '/'` so asset paths resolve correctly on GitHub Pages.
2. `.env` at project root must define `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (values blank or local — never committed).
3. `.gitignore` must include `.env`, `node_modules/`, and `dist/`.
4. `.github/workflows/deploy.yml` must:
   - Trigger on push to `main` only
   - Run `npm ci` → `npm run build`
   - Inject `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from GitHub repository secrets during the build step
   - Deploy the `dist/` folder to GitHub Pages using `peaceiris/actions-gh-pages@v3`

---

## Interfaces

- **Files:** `vite.config.js`, `.env`, `.gitignore`, `.github/workflows/deploy.yml`
- **GitHub:** Repository secrets `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **GitHub Pages:** Served from the `gh-pages` branch, root path `/`

---

## Data & Validations

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be set as GitHub secrets before the workflow can build successfully.
- If either secret is missing, the build will succeed but the Supabase client will be `null` at runtime (handled in `supabaseClient.js`).
- `dist/` is never committed — it is generated at build time by the workflow.

---

## Acceptance Criteria

- [ ] `npm run build` completes with exit code 0 locally
- [ ] Pushing a commit to `main` triggers the GitHub Actions workflow automatically
- [ ] The workflow completes without error and the site is live at `https://WhoZihni.github.io`
- [ ] The deployed site loads with no 404 errors on the root path
- [ ] `.env` is not present in the repository or in the deployed output
- [ ] `dist/` is not present in the repository
