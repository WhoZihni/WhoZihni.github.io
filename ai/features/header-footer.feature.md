# Feature Spec: Header & Footer

## Goal
Provide consistent site-wide navigation and branding through a shared Header and Footer, composed inside a Layout wrapper used by all public pages.

## Scope

**In scope:**
- `Header.jsx` with nav links to all public pages
- `Footer.jsx` with name and copyright
- `Layout.jsx` composing Header + main content + Footer

**Out of scope:**
- Mobile hamburger menu (can be added later)
- Active link highlighting (can be added later)
- Social media icons in footer (covered in Links feature)

---

## Requirements

1. `Header.jsx` renders a `<header>` element containing a `<nav>` with `<Link>` elements (React Router) to: `/` (Home), `/portfolio` (Portfolio), `/links` (Links), `/contact` (Contact).
2. The `/login` and `/backoffice` routes are **never** linked from the Header.
3. `Footer.jsx` renders a `<footer>` element with Ahmed's name and the current year copyright notice.
4. `Layout.jsx` renders `<Header />`, a `<main>` element wrapping `{children}`, then `<Footer />`.
5. All public pages (Home, Portfolio, Links, Contact) render inside `<Layout>`. Login and BackOffice do **not** use Layout.

---

## Interfaces

- **Components:** `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/Layout.jsx`
- **Used by:** `App.jsx` — wraps each public route's page component in `<Layout>`
- **Router dependency:** `react-router-dom` `<Link>` in Header

---

## Data & Validations

- No data fetching — purely presentational
- Copyright year must be dynamic: `new Date().getFullYear()`
- Nav links must use React Router `<Link>` — not `<a href>` — to avoid full page reloads

---

## Acceptance Criteria

- [ ] Header renders on Home, Portfolio, Links, and Contact pages
- [ ] Header does NOT render on Login or BackOffice pages
- [ ] All four nav links navigate correctly without a full page reload
- [ ] Footer renders on all public pages with the correct name and current year
- [ ] Layout renders in correct order: Header → main content → Footer
- [ ] No console errors on any public route
