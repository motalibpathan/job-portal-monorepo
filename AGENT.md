# AGENT.md - Job Portal Frontend Monorepo

## Project Overview

This is a **frontend-only monorepo** for a job portal application. It contains shared UI components, API utilities, and two SPA applications (user portal + admin dashboard).

## Tech Stack

- **React 18** + **TypeScript 5** (strict mode)
- **Vite 7** (build tool, dev servers)
- **Tailwind CSS v4** + **Ant Design 5** (styling)
- **React Router v6** (client-side routing)
- **Axios** (HTTP client with JWT auto-refresh)
- **Lerna + Yarn Workspaces** (monorepo management)

## Package Structure

```
packages/
  common/       @job-portal/common     Shared library (components, API, contexts, utils)
  admin-ui/     @job-portal/admin-ui   Admin dashboard SPA (port 3003)
  user-ui/      @job-portal/user-ui    User-facing SPA (port 3004)
```

## Dependency Graph

```
@job-portal/common  ←── @job-portal/admin-ui
                   ←── @job-portal/user-ui
```

Both UI apps consume `common` at **source level** via path aliases (not compiled). See `tsconfig.json` paths and `vite.config.mts` aliases.

## Key Commands

| Command | Description |
|---------|-------------|
| `yarn start:user` | Start user-ui dev server (port 3004) |
| `yarn start:admin` | Start admin-ui dev server (port 3003) |
| `yarn build` | Build both UIs |
| `yarn lint:user` | Lint user-ui |
| `yarn lint:admin` | Lint admin-ui |
| `yarn clean` | Remove all node_modules and build outputs |

## Code Conventions

- **Atomic Design** in `common/src/components/` (atoms → molecules → templates → layouts)
- All UI primitives wrap Ant Design components with custom Tailwind styling
- Use `cn()` utility from `common/src/utils/cn.ts` for class merging (clsx + tailwind-merge)
- Form validation uses Zod schemas via `zodSchemaWrapper` from `common/src/validators/`
- API error handling: `handlePrivateApiError(err, onLogout)` for authenticated calls, `handlePublicApiError(err)` for public calls
- Handler naming: Component functions wrapping API calls use `{ApiFn}Action` suffix (e.g., `getCompanyJobsApiAction`)
- Route paths are centralized in `common/src/HOC/routes/routes.ts`
- API types are in `common/src/api/userApi/types.ts`
- Environment variables use `VITE_` prefix
- Node requirement: `>=22.0.0`

### Enums Pattern

All enum-like values must use the const+array+type pattern (matching backend `src/constants/jobEnums.ts`):

```ts
// 1. Const object with UPPER_CASE keys
export const JOB_REMOTE_OPTIONS = {
  ON_SITE: "on-site" as const,
  HYBRID: "hybrid" as const,
  REMOTE: "remote" as const,
};

// 2. Array of values (for runtime iteration and Zod enums)
export const jobRemoteOptions = Object.values(JOB_REMOTE_OPTIONS);

// 3. Type derived from the array
export type TJobRemoteOption = (typeof jobRemoteOptions)[number];
```

- Constants live in `common/src/api/userApi/types.ts`
- Re-exported from `common/src/index.ts` and `common/src/validators/index.ts`
- Use `JOB_*` for the const object, `job*` (camelCase) for the array, `T*` for the type
- Zod validators use `z.enum(array as [string, ...string[]])` — never `z.string()` for enum fields
- Both frontend and backend must define identical enum values

## Architecture Patterns

- **State**: React Context (AuthContext, CompanyContext) — no Redux/Zustand
- **Auth**: JWT with auto-refresh via Axios interceptors; tokens in localStorage
- **Validation**: Zod schemas via `zodSchemaWrapper` in `validators/` — field-level errors as `TValidationError<T>`
- **API error handling**: `handlePrivateApiError(err, onLogout)` for authenticated calls, `handlePublicApiError(err)` for public calls. Returns `{ status, error, data }`. Toast with `data?.message || error || fallback`.
- **Handler naming**: Component-level API wrapper functions use `{ApiFunctionName}Action` suffix (e.g., `getCompanyJobsApiAction`)
- **Routing**: `createBrowserRouter` with `PrivateRoute` HOC for auth guards
- **Styling**: Tailwind v4 `@theme` tokens in `common/src/styles/tailwind-theme.css` + Ant Design 5 CSS-in-JS
- **CSS Layer**: `@layer theme, base, antd, components, utilities` — `StyleProvider layer` wraps `ConfigProvider` so Tailwind utilities override Ant Design
- **Typography atoms**: Heading, Title, Subtitle, Paragraph, Label, Caption — all use theme tokens
- **Font**: Space Grotesk (loaded via Google Fonts)
- **API base URL**: Read from `VITE_API_BASE_URL` env var (defaults to `http://localhost:7000`)

## When Modifying Code

1. Shared UI components go in `common/src/components/`
2. New API functions go in `common/src/api/userApi/`
3. New route definitions go in `common/src/HOC/routes/routes.ts`
4. App-specific components go in the respective `src/components/` of admin-ui or user-ui
5. Always check the Tailwind theme file before adding new design tokens
6. Run `yarn lint:<package>` before committing

## Plans

Feature plans are written and maintained in the `plans/` folder:

- **Frontend plans**: `job-portal-monorepo/plans/` (this repo)
- **Backend plans**: `job-portal-server/plans/` (sibling repo)

### Mandatory: Update Plans on Every Feature Change

**Every time a feature is added, modified, or removed, the corresponding plan file MUST be created or updated to reflect the actual implementation.** This applies to both frontend and backend changes.

Rules:
1. **Before implementing**: Write or update the plan file with the intended changes
2. **After implementing**: Update the plan file to match what was actually built (types, API endpoints, file names, route constants, design decisions)
3. Plans must document: overview, design decisions, API mapping, types, file list, and implementation phases
4. Keep plan files as the **source of truth** for what exists in the codebase
5. Update ARCHITECTURE.md and this file if the plan adds new patterns or conventions
