# Ahmed Zihni — Portfolio

Personal portfolio and professional link-in-bio built for the Codeboxx Full-Stack Bootcamp Module 16. Live at [whozihni.github.io](https://whozihni.github.io).

## Description

A full-stack portfolio site showcasing projects, skills, and work history. Features a public-facing site (Home, Portfolio, Links, Contact) and a password-protected back-office for viewing contact form submissions. Built with React + Vite, deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router DOM v6, plain CSS |
| Build | Vite |
| Auth & Database | Supabase (PostgreSQL + Auth) |
| Deployment | GitHub Actions → GitHub Pages |
| Hosting | GitHub Pages (`whozihni.github.io`) |

## Project Structure

```
src/
  assets/          # Images and static files
  components/      # Header, Footer, Layout
  lib/             # Supabase client singleton
  pages/           # Home, Portfolio, Links, Contact, Login, BackOffice
  App.jsx          # Router + ProtectedRoute
  index.css        # Global CSS variables and resets
public/
  resume.pdf       # Downloadable resume
```

## Installation

```bash
git clone https://github.com/WhoZihni/WhoZihni.github.io.git
cd WhoZihni.github.io
npm install
npm run dev
```

## Environment Variables

Create a `.env` file at the project root (never commit this file):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The Supabase client in `src/lib/supabaseClient.js` will be `null` if these variables are missing — all Supabase calls are null-checked so the app still renders without them.

## Supabase Setup

One table is required:

**`messages`** — stores contact form submissions

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key, auto-generated |
| name | text | sender's name |
| email | text | sender's email |
| message | text | message body |
| created_at | timestamptz | auto-set by Supabase |

Row Level Security (RLS) is enabled. The anon role can INSERT only. Reading and deleting messages requires an authenticated session (admin account).

The admin account is created manually in the Supabase dashboard — it is never created in code.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. GitHub Pages serves from that branch.

To deploy: merge `dev` → `main`.

## Author

Ahmed Zihni — Full-Stack Developer, Tampa FL
GitHub: [WhoZihni](https://github.com/WhoZihni)
LinkedIn: [ahmed-zihni-4443b03a5](https://www.linkedin.com/in/ahmed-zihni-4443b03a5/)
