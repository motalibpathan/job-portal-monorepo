# Pricing Implementation — Frontend

## Overview

Add billing page in company dashboard, public pricing page, frontend enums/types synced with backend, sidebar + router updates.

## Routes

| Route | Component | Auth | Layout |
|-------|-----------|------|--------|
| `/pricing` | PricingPage | Public | None |
| `/companies/:userName/billing` | BillingPage | Private | CompanyDashboardLayout |

## Enums + Types (types.ts)

### Enums (const + array + type pattern)
```
COMPANY_PLAN         { FREE, BOOTSTRAP, STARTUP, BUSINESS }
JOB_STATUS           { ACTIVE, DRAFT, CLOSED }
SUBSCRIPTION_STATUS  { ACTIVE, CANCELLED, EXPIRED }
BILLING_CYCLE        { MONTHLY, YEARLY }
```

### Text Maps
```
COMPANY_PLAN_TEXT_MAP         { free: "Free", bootstrap: "Bootstrap", ... }
JOB_STATUS_TEXT_MAP           { active: "Active", draft: "Draft", closed: "Closed" }
SUBSCRIPTION_STATUS_TEXT_MAP  { active: "Active", cancelled: "Cancelled", expired: "Expired" }
SUBSCRIPTION_STATUS_COLOR_MAP { active: "success", cancelled: "default", expired: "error" }
BILLING_CYCLE_TEXT_MAP        { monthly: "Monthly", yearly: "Yearly" }
```

### Interfaces
```ts
ICompany updated: add plan, planExpiresAt
ISubscription: _id, companyId, plan, billingCycle, amount, status, startDate, endDate
ITransaction: same as ISubscription (for history list)
```

### Plan config constant
```ts
PLAN_CONFIG = {
  free:      { price: 0,   activeJobLimit: 2,  teamMembers: 1 },
  bootstrap: { price: 29,  activeJobLimit: 3,  teamMembers: Infinity },
  startup:   { price: 49,  activeJobLimit: 10, teamMembers: Infinity },
  business:  { price: 129, activeJobLimit: 20, teamMembers: Infinity },
}
```

## Sidebar

Add "Billing" item after Settings:
```ts
{ key: COMPANY_BILLING(userName), icon: <CreditCardOutlined />, label: "Billing" }
```

## BillingPage — 2 Tabs

1. **Plan** — current plan card, usage (X/2 active jobs), upgrade buttons
2. **Transactions** — table: date, plan, amount, status

## PricingPage — Public

4 tier cards with feature comparison. "Get Started" button → login or activate.

## Files

| File | Change |
|------|--------|
| `packages/common/src/api/userApi/types.ts` | Add enums, text maps, ICompany update, ISubscription |
| `packages/common/src/HOC/routes/routes.ts` | Add COMPANY_BILLING, PRICING |
| `packages/common/src/components/layouts/CompanyDashboardLayout.tsx` | Add Billing menu item |
| `packages/common/src/components/templates/companyDashboard/BillingPage.tsx` | New |
| `packages/common/src/components/templates/pricing/PricingPage.tsx` | New |
| `packages/user-ui/src/HOC/routes/Router.tsx` | Add billing + pricing routes |
| `packages/common/src/index.ts` | Barrel exports |
| `packages/common/src/api/userApi/index.ts` | Barrel exports |
| `packages/common/src/validators/index.ts` | Barrel exports |

## Status

| Step | Status |
|------|--------|
| Create plan file | Done |
| Frontend enums + types | Pending |
| Routes constants | Pending |
| Sidebar update | Pending |
| Router update | Pending |
| BillingPage | Pending |
| PricingPage | Pending |
| Barrel exports | Pending |
| tsc --noEmit | Pending |
