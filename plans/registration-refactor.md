# Registration Refactor - Plan

## Overview

Separate user registration from company creation. Registration only creates a user account. Company creation becomes a separate step after login.

## Current Flow

Register → takes name, email, password, company name, company username → calls `signup-with-company` → creates user + company → dashboard

## New Flow

1. Register → takes name, email, password only → creates user only → login
2. After login, if no company → redirect to `/onboarding/company` (already exists as CompanySetup.tsx)
3. After login, if has company → go to dashboard

## Invite Flow (unchanged)

1. User registers (name, email, password only)
2. Clicks invite link → joins team → has company → go to dashboard

## Backend Changes

### Modify `POST /api/signup` (skip OTP, user only)

File: `src/routes/api/user/userRouter/v4/emailApi.ts`

Currently `POST /signup` requires OTP. Modify to skip OTP (like `signup-with-company`):

```ts
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // Create user only — no company, no OTP
});
```

### Deprecate `POST /api/signup-with-company`

Keep for backwards compatibility but mark as deprecated.

## Frontend Changes

### SignupBox.tsx

File: `user-ui/src/components/templates/signup/SignupBox.tsx`

- Remove Company Name and Company Username fields
- Call `POST /api/signup` instead of `registerWithCompanyApi`
- After registration → login → redirect logic handles company check

### LoginBox.tsx (already done)

Read `?redirectTo=` after auth — already implemented in team members feature.

## Flow Summary

| Step | Before | After |
|------|--------|-------|
| Register | Name, email, password, company name, company username | Name, email, password only |
| After login | Go to dashboard | If no company → `/onboarding/company`. If has company → dashboard |
| Invite | N/A | Register → join team → has company → dashboard |

## Files

| File | Action |
|------|--------|
| `job-portal-server/src/routes/api/user/userRouter/v4/emailApi.ts` | Modify `POST /signup` to skip OTP |
| `user-ui/src/components/templates/signup/SignupBox.tsx` | Remove company fields, call new signup API |

## Implementation Order

1. Modify `POST /signup` backend endpoint (skip OTP, user only) — Done
2. Update SignupBox frontend (remove company fields) — Done
3. Add `userSignupApi` frontend function — Done
4. Test: register → no company → onboarding flow
5. Test: register → invite link → join team → dashboard
