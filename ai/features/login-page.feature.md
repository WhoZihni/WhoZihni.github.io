# Feature Spec: Login Page

## Goal
Provide a hidden, minimal login interface that authenticates Ahmed (the site owner) via Supabase email/password auth, granting access to the BackOffice.

## Scope

**In scope:**
- Email + password login form
- Supabase auth session creation
- Redirect to `/backoffice` on success

**Out of scope:**
- Sign-up flow — account is pre-created in Supabase dashboard
- Password reset flow (can be added later)
- OAuth or social login
- "Remember me" option

---

## Requirements

1. Page renders at route `/login` — standalone, no Header or Footer, no Layout wrapper.
2. Form must include:
   - Email field (email type, required)
   - Password field (password type, required)
   - Submit / Login button
3. On submit:
   - Call `supabase.auth.signInWithPassword({ email, password })`
   - On success: navigate to `/backoffice` using React Router `useNavigate`
   - On error: show the error message returned by Supabase (e.g., "Invalid login credentials")
4. If the user already has an active session on mount, redirect immediately to `/backoffice`.
5. Disable the submit button while login is in progress.
6. The route `/login` must never appear in the Header nav.

---

## Interfaces

- **Page:** `src/pages/Login.jsx`
- **No Layout wrapper**
- **Supabase auth:** `supabase.auth.signInWithPassword`, `supabase.auth.getSession`
- **Supabase client:** imported from `src/lib/supabaseClient.js`
- **Navigation:** React Router `useNavigate`

---

## Data & Validations

| Field | Rule |
|---|---|
| `email` | Required, valid email format |
| `password` | Required, non-empty |

- Do not validate password complexity — pass it to Supabase as-is
- Never log or expose the password value
- Error messages come directly from Supabase — do not transform them

---

## Acceptance Criteria

- [ ] Navigating to `/login` renders the login form with no Header or Footer
- [ ] Submitting valid credentials creates a session and redirects to `/backoffice`
- [ ] Submitting invalid credentials shows the Supabase error message
- [ ] A user with an existing session visiting `/login` is redirected to `/backoffice`
- [ ] Submit button is disabled during the auth request
- [ ] Password field does not display the value in plain text
- [ ] No console errors on load or submit
