# ARCHITECTURE.md - Job Portal Frontend Monorepo

## System Architecture

This monorepo contains the frontend applications for a job portal platform. The backend API is expected at `http://localhost:7000` (configurable via `VITE_API_BASE_URL`).

```
┌─────────────────────────────────────────────────┐
│                   user-ui (3004)                 │
│  React SPA → Common Package → Axios → Backend   │
└──────────────────────┬──────────────────────────┘
                       │ source-level imports
┌──────────────────────▼──────────────────────────┐
│              @job-portal/common                  │
│  Components · API · Contexts · Utils · Layouts   │
└──────────────────────┬──────────────────────────┘
                       │ source-level imports
┌──────────────────────▼──────────────────────────┐
│                  admin-ui (3003)                 │
│  React SPA → Common Package → Axios → Backend   │
└─────────────────────────────────────────────────┘
```

## Package Details

### @job-portal/common (Shared Library)

**Not a published package** — consumed at source level via Vite/TypeScript path aliases.

#### Directory Structure

```
common/src/
├── index.ts                    # Barrel export (single entry point)
├── api/
│   ├── apiRequest.ts           # Axios instances (public + private) with interceptors
│   ├── errorHandler.ts         # HTTP error → user-friendly message mapping
│   └── userApi/
│       ├── types.ts            # All API domain types + enums (JOB_REMOTE_OPTIONS, etc.)
│       └── userApi.ts          # API functions (login, signup, companies, etc.)
├── components/
│   ├── atoms/                  # Primitives: Button, Heading, TextField, Select, Modal, Form
│   ├── molecules/              # Composed: FormField
│   ├── templates/              # Pages: CompaniesPage, ErrorElement, PagePlaceholder
│   └── layouts/                # BlankLayout, DashboardLayout, CompanyDashboardLayout
├── HOC/
│   ├── contexts/
│   │   ├── General/AuthContext/ # AuthProvider + useAuthContext
│   │   └── CompanyContext/     # CompanyProvider + useCompanyContext
│   └── routes/
│       ├── routes.ts           # All route path constants
│       └── PrivateRoute.tsx    # Auth guard HOC
├── styles/
│   └── tailwind-theme.css      # Tailwind v4 @theme design tokens
├── types/                      # Layout prop types
└── utils/
    ├── cn.ts                   # clsx + tailwind-merge
    ├── config.ts               # VITE_API_BASE_URL reader
    ├── localstorage.ts         # Typed localStorage helpers
    ├── regex.ts                # Email/username validation regex
    ├── toast.ts                # Ant Design notification wrapper
    └── validators/             # Zod schemas + zodSchemaWrapper
        ├── validatorHelpers.ts # zodSchemaWrapper, TValidationError, TValidationResult
        ├── job.ts              # signup, companySetup, companyInfo, jobForm, otp schemas
        └── index.ts            # Barrel export
```

#### API Layer Architecture

```
Browser Request
    │
    ▼
┌─────────────────┐    ┌─────────────────┐
│  publicInstance  │    │  privateInstance │
│  (no auth header)│    │  (JWT in header) │
└────────┬────────┘    └────────┬────────┘
         │                      │
         │              ┌───────▼────────┐
         │              │ Request         │
         │              │ Interceptor     │
         │              │ (attach token)  │
         │              └───────┬────────┘
         │                      │
         ▼                      ▼
         └──────────┬───────────┘
                    │
              Backend API
                    │
         ┌──────────▼───────────┐
         │ Response Interceptor  │
         │ (auto-refresh 401)    │
         └──────────────────────┘
```

- `publicInstance`: Login, signup, token refresh (no auth header)
- `privateInstance`: All authenticated requests (attaches Bearer token)
- On 401: interceptor reads refresh token, POSTs to `/api/token/refresh`, retries original request

#### Component Hierarchy (user-ui)

```
StyleProvider (layer) — enables @layer for Tailwind/Ant Design coexistence
  └─ ConfigProvider (Ant Design theme)
       └─ AntdApp
            └─ AuthProvider (AuthContext)
                 └─ CompanyProvider (CompanyContext)
                      └─ RouterProvider
                           ├─ /login → LoginPage
                           ├─ /register → SignupPage
                           ├─ / (private) → DashboardLayout → UserHome
                           ├─ /onboarding/company (private) → CompanySetup
                           └─ /companies (private) → CompanyDashboardLayout
                            ├─ /companies → CompaniesPage
                                 └─ /companies/:userName/* → Company sub-pages
                                      ├─ /dashboard → DashboardOverview
                                      ├─ /jobs → JobsList
                                      ├─ /jobs/create → JobForm
                                      ├─ /jobs/:slug/edit → JobForm
                                      ├─ /applications → ApplicationsList
                                      ├─ /company → CompanyInfoForm
                                      └─ /settings → SettingsPage
```

### @job-portal/user-ui (User Portal SPA)

**Port**: 3004 | **Output**: `build/`

Key features:
- Multi-step login flow (email check → password or OTP)
- Google OAuth integration
- Signup with company creation
- Company onboarding wizard
- Company dashboard with sidebar navigation

#### Auth Flow

```
Login Page
  │
  ├─ Enter email → POST /api/login/check
  │   ├─ command: "login" → Show password field → POST /api/login
  │   └─ command: "verify" → Show OTP + new password → POST /api/login
  │
  ├─ Google OAuth → POST /api/google/login
  │
  └─ On success:
       ├─ Store tokens in localStorage
       ├─ Set Axios auth header
       ├─ Fetch user's companies → POST /api/companies/mine
       └─ Redirect based on company count:
           ├─ 0 companies → /onboarding/company
           ├─ 1 company → /companies/:userName/dashboard
           └─ 2+ companies → /companies (list)
```

### @job-portal/admin-ui (Admin Dashboard SPA)

**Port**: 3003 | **Output**: `build/`

Minimal admin interface with two routes:
- `/` — Admin home
- `/companies` — Companies list (admin variant)

Uses `AuthProvider` but **not** `CompanyProvider`.

## Shared Design System

### Tailwind Theme Tokens

Defined in `common/src/styles/tailwind-theme.css` using Tailwind v4 `@theme`:

| Category | Tokens |
|----------|--------|
| **Font families** | `sans` (Space Grotesk), `mono` (JetBrains Mono) |
| **Typography colors** | `heading`, `title`, `subtitle`, `paragraph`, `label`, `inverse`, `caption`, `menu` — each with `dark-2` → `light-2` variants |
| **Brand colors** | `primary`, `secondary` — each with `dark-3` → `light-3` variants |
| **Status colors** | `success`, `warning`, `danger` — each with `dark-2` → `light-2` variants |
| **Neutral colors** | `grays-gray-1` → `gray-10`, `borders-dark-2` → `light-2` |
| **Backgrounds** | `body-1`, `body-2`, `backdrop`, `navbar` — each with shade variants |
| **Typography scales** | Heading (6 levels), Title (6), Subtitle (6), Paragraph (6), Label (4), Caption (3) |
| **Spacing** | `space-0` → `space-32` (0 to 8rem) |
| **Border radius** | `radius-none` → `radius-full` |
| **Shadows** | `shadow-1` → `shadow-5`, `shadow-card-1`, `shadow-card-2` |
| **Z-index** | `z-index-1` → `z-index-5` |
| **Breakpoints** | `xs` (600px) through `xl` (2600px) — 7 levels |

### Typography Atoms

Six typography primitives in `common/src/components/atoms/typography/`:

| Atom | Purpose | Levels | Default Palette |
|------|---------|--------|-----------------|
| **Heading** | Page-level headings (h1–h6) | 6 | `heading` |
| **Title** | Card/section titles | 6 | `title` |
| **Subtitle** | Descriptions under titles | 6 | `subtitle` |
| **Paragraph** | Body text | 6 | `paragraph` |
| **Label** | Form labels (supports `$required`) | 4 | `label` |
| **Caption** | Small text, metadata, timestamps | 3 | `caption` |

All atoms accept: `$typographyPalette`, `$colorPalette`, `$variant`, `$textAlign`, `$fontWeight`.

### Ant Design Theme

Configured in each app's `App.tsx` via `StyleProvider` (layer) → `ConfigProvider`:
- Primary color: `#2980b9`
- Border radius: 8px
- Font: Space Grotesk, Segoe UI, sans-serif

The `@layer` order in `tailwind-theme.css` ensures Tailwind utilities can override Ant Design styles:
```css
@layer theme, base, antd, components, utilities;
```

## Route Map

### user-ui Routes

| Path | Component | Auth | Layout |
|------|-----------|------|--------|
| `/login` | LoginPage | No | Auth layout (built-in) |
| `/register` | SignupPage | No | Auth layout (built-in) |
| `/` | UserHome | Yes | DashboardLayout |
| `/onboarding/company` | CompanySetup | Yes | DashboardLayout (centered) |
| `/companies` | CompaniesPage | Yes | CompanyDashboardLayout |
| `/companies/:userName/dashboard` | DashboardOverview | Yes | CompanyDashboardLayout |
| `/companies/:userName/jobs` | JobsList | Yes | CompanyDashboardLayout |
| `/companies/:userName/jobs/create` | JobForm | Yes | CompanyDashboardLayout |
| `/companies/:userName/jobs/:slug/edit` | JobForm | Yes | CompanyDashboardLayout |
| `/companies/:userName/applications` | ApplicationsList | Yes | CompanyDashboardLayout |
| `/companies/:userName/company` | CompanyInfoForm | Yes | CompanyDashboardLayout |
| `/companies/:userName/settings` | SettingsPage | Yes | CompanyDashboardLayout |

### admin-ui Routes

| Path | Component | Auth | Layout |
|------|-----------|------|--------|
| `/` | AdminHome | Yes | DashboardLayout (dark bg) |
| `/companies` | CompaniesPage (admin) | Yes | DashboardLayout (dark bg) |

## Environment Variables

### user-ui

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | No | Backend API URL (default: `http://localhost:7000`) |
| `VITE_GOOGLE_CLIENT_ID` | No | Google OAuth client ID |

## Build & Dev Configuration

| Setting | user-ui | admin-ui |
|---------|---------|----------|
| Dev port | 3004 | 3003 |
| Build output | `build/` | `build/` |
| TypeScript | Strict, ESNext target | Strict, ESNext target |
| Module resolution | Bundler | Bundler |

## Plans

Feature plans are written and maintained in `plans/` folders before implementation:

- **Frontend plans**: `job-portal-monorepo/plans/` (this repo)
- **Backend plans**: `job-portal-server/plans/` (sibling repo)

Each plan file documents: overview, design decisions, API mapping, types, files to create, and implementation phases.

### Mandatory: Update Plans on Every Feature Change

**Every time a feature is added, modified, or removed, the corresponding plan file MUST be created or updated to reflect the actual implementation.** Plans must always match what is actually built in the codebase.

## Known State

- All company dashboard pages are fully implemented (no more PagePlaceholder stubs)
- Jobs use human-readable slugs in URLs (e.g. `/companies/acme/jobs/frontend-developer/edit`)
- The `common` package has `organisms/` directory but it only contains an `index.ts` barrel (empty)
- No test files exist in any package
