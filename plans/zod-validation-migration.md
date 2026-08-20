# Zod Validation Migration - Plan

## Overview

Adopt engaze-ui-monorepo's Zod-based form validation pattern across all job-portal forms. Replaces manual `if` checks in submit handlers with centralized Zod schemas and a reusable `zodSchemaWrapper` validator.

## The Pattern (from engaze)

### Core Infrastructure

**`zodSchemaWrapper`** (`validators/validatorHelpers.ts`):
```ts
zodSchemaWrapper(schema)(data) → { isValid, errors, data, message }
```
- Wraps any Zod schema into a synchronous validator
- Returns field-level errors as `Partial<Record<keyof T, string>>`
- Returns first error message as `message` for toast display
- Handles nested paths and array errors via `extractZodErrors`

**Types**:
```ts
type TValidationError<T> = Partial<Record<keyof T, string>>;
type TValidationResult<T> = { isValid: boolean; errors: TValidationError<T>; data?: T; message?: string };
```

### Form Pattern

1. **Error state**: `const [errors, setErrors] = useState<TValidationError<FormInput>>({});`
2. **On submit**: validate → if invalid, set errors + toast first error → return early
3. **On field change**: clear that field's error (`setErrors(prev => ({ ...prev, fieldName: undefined }))`)
4. **In JSX**: pass `errorMessage={errors.fieldName}` to each form molecule

## Files Created

| # | File | Purpose |
|---|------|---------|
| 1 | `packages/common/src/validators/validatorHelpers.ts` | `zodSchemaWrapper`, `TValidationError`, `TValidationResult` |
| 2 | `packages/common/src/validators/job.ts` | Zod schemas for signup, company setup, company info, job form, OTP |
| 3 | `packages/common/src/validators/index.ts` | Barrel export |

## Files Edited

| # | File | Changes |
|---|------|---------|
| 4 | `packages/common/package.json` | Added `zod` dependency |
| 5 | `packages/common/src/index.ts` | Exported validators |
| 6 | `packages/user-ui/src/components/templates/signup/SignupBox.tsx` | Replaced manual if-checks with Zod |
| 7 | `packages/user-ui/src/components/templates/company/CompanySetup.tsx` | Replaced manual if-checks with Zod |
| 8 | `packages/common/src/components/templates/companyDashboard/CompanyInfoForm.tsx` | Replaced manual if-checks with Zod |
| 9 | `packages/common/src/components/templates/companyDashboard/JobForm.tsx` | Replaced toast.error checks with Zod |
| 10 | `packages/user-ui/src/components/organisms/signupOrLogin/OtpView.tsx` | Replaced manual if-checks with Zod |

## Zod Schemas

### signupSchema
```ts
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
```

### companySetupSchema
```ts
const companySetupSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyUserName: z.string().optional(),
  description: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});
```

### companyInfoSchema
```ts
const companyInfoSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});
```

### jobFormSchema
```ts
const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  country: z.string().optional(),
  remoteOption: z.string().min(1, "Remote option is required"),
  employmentType: z.string().min(1, "Employment type is required"),
});
```

### otpSchema
```ts
const otpSchema = z.object({
  otp: z.string().min(4, "OTP is not valid"),
  newPassword: z.string().min(8, "Password must contain at least 8 characters"),
});
```

## Migration Pattern

### Before (manual if-checks)
```ts
const handleSubmit = async () => {
  setErrors({});
  if (!name.trim()) {
    setErrors({ name: "Name is required" });
    return;
  }
  // ... submit
};
```

### After (Zod)
```ts
const validate = zodSchemaWrapper(signupSchema);

const handleSubmit = async () => {
  setErrors({});
  const result = validate({ name, email, password });
  if (!result.isValid) {
    setErrors(result.errors);
    if (result.message) toast.error(result.message);
    return;
  }
  // ... submit with result.data
};
```

## Scope Notes

- `ApplicationFormBuilder.tsx` and `HiringStageBuilder.tsx` are **not** migrated — they are dynamic array builders with per-item validation that doesn't map cleanly to Zod object schemas.
- Async validation (username availability check in CompanySetup) stays outside Zod — Zod only covers synchronous field rules.
- `CategoryManager.tsx` is also excluded — it uses a simple modal input, not a form with multiple fields.

## Implementation Status

| Phase | Status |
|-------|--------|
| Install zod | Done |
| Create validators/ | Done |
| Export from common/index.ts | Done |
| Migrate SignupBox.tsx | Done |
| Migrate CompanySetup.tsx | Done |
| Migrate CompanyInfoForm.tsx | Done |
| Migrate JobForm.tsx | Done |
| Migrate OtpView.tsx | Done |
| Create plan file | Done |
| Update ARCHITECTURE.md + AGENT.md | Done |
| Lint | Pending |
