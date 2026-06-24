# Feature Spec: Contact Page

## Goal
Allow visitors to send Ahmed a message directly from the site, with submissions stored in Supabase and a clear confirmation shown to the sender.

## Scope

**In scope:**
- Contact form with name, email, and message fields
- Form submission saved to Supabase `messages` table
- Success and error feedback to the user

**Out of scope:**
- Email notifications (no email service integration)
- CAPTCHA or spam protection
- File attachments

---

## Requirements

1. Page renders at route `/contact` inside `<Layout>`.
2. Form must include:
   - Name field (text, required)
   - Email field (email type, required)
   - Message field (textarea, required)
   - Submit button
3. On submit:
   - Validate all fields are non-empty and email matches a basic email format
   - Insert a row into the Supabase `messages` table with `name`, `email`, `message`, and `created_at`
   - On success: clear the form and show a success message
   - On error: show a user-facing error message without clearing the form
4. Disable the submit button while submission is in progress.
5. If `supabase` is null, show a configuration error and do not render the form.

---

## Interfaces

- **Page:** `src/pages/Contact.jsx`
- **Wrapped by:** `<Layout>` via `App.jsx`
- **Supabase table:** `messages`
- **Supabase client:** imported from `src/lib/supabaseClient.js`

### Supabase `messages` table schema
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | Sender name |
| `email` | text | Sender email |
| `message` | text | Message body |
| `created_at` | timestamptz | Auto-set |

---

## Data & Validations

| Field | Rule |
|---|---|
| `name` | Required, non-empty string |
| `email` | Required, must match basic email pattern |
| `message` | Required, non-empty string |

- Validation runs on submit, not on blur
- Supabase RLS must allow anonymous insert into `messages`
- Read access to `messages` is restricted — public cannot query submissions

---

## Acceptance Criteria

- [ ] Navigating to `/contact` renders the form with Header and Footer
- [ ] Submitting valid data inserts a row into Supabase and shows a success message
- [ ] Form is cleared after successful submission
- [ ] Submitting with empty fields shows validation errors
- [ ] Submitting with an invalid email format shows a validation error
- [ ] Submit button is disabled during submission
- [ ] Supabase error during insert shows a user-facing error without clearing the form
- [ ] Page is responsive at 320px, 768px, and 1280px
