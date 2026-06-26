# Feature Spec: Home Page

## Goal
Serve as Ahmed's primary introduction — a hero section that communicates who he is, what he does, and gives visitors a clear next action.

## Scope

**In scope:**
- Hero section with name, title/tagline, and short bio
- Call-to-action buttons (e.g., View Portfolio, Contact Me)
- Optional: profile photo

**Out of scope:**
- Full project showcase (covered in Portfolio)
- Skills grid or technology logos
- Animations or scroll effects (can be added later)

---

## Requirements

1. Page renders at route `/` inside `<Layout>`.
2. Hero section must include:
   - Ahmed's full name
   - A one-line title or tagline (e.g., "Full-Stack Developer")
   - A short bio paragraph (2–3 sentences max)
   - At least one CTA button linking to `/portfolio` and one linking to `/contact`
3. If a profile photo is used, it must have descriptive `alt` text.
4. Page must be fully responsive across mobile, tablet, and desktop breakpoints.

---

## Interfaces

- **Page:** `src/pages/Home.jsx`
- **Wrapped by:** `<Layout>` via `App.jsx`
- **Links to:** `/portfolio`, `/contact`

---

## Data & Validations

- No data fetching — all content is static
- Bio text and tagline are hardcoded in the component
- Profile photo (if used) is a local asset from `src/assets/`

---

## Acceptance Criteria

- [ ] Navigating to `/` renders the Home page with Header and Footer
- [ ] Hero section displays name, title, and bio
- [ ] Both CTA buttons navigate to the correct routes
- [ ] Profile photo (if present) has non-empty `alt` text
- [ ] Page layout does not break at 320px, 768px, or 1280px viewport widths
- [ ] No console errors on load
