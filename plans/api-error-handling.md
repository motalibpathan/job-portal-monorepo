# API Error Handling Migration - Plan

## Overview

Standardize all API error handling in React components to follow the engaze pattern: `handlePrivateApiError`/`handlePublicApiError` + structured error messages. Also rename component handler functions to `{ApiFn}Action` suffix.

## Pattern

### Authenticated API calls
```ts
import { handlePrivateApiError, type ICommonApiError } from "../../../api/errorHandler";

} catch (err) {
  const { error, data } = handlePrivateApiError(
    err as ICommonApiError,
    onLogout,
  );
  toast.error(data?.message || error || "Fallback message");
}
```

### Public API calls (login, signup)
```ts
import { handlePublicApiError } from "../../../api/errorHandler";
import type { AxiosError } from "axios";

} catch (err) {
  const { error, data } = handlePublicApiError(err as AxiosError);
  setAuthErrorMessage(data?.message || error || "Fallback message");
}
```

### Naming convention
```ts
// API function: getCompanyJobsApi
// Component handler: getCompanyJobsApiAction
const getCompanyJobsApiAction = useCallback(async () => { ... }, []);
```

## Files Migrated

| # | File | Catch blocks | Type |
|---|------|-------------|------|
| 1 | `JobsList.tsx` | 2 | private |
| 2 | `TeamMembersPage.tsx` | 2 | private |
| 3 | `DashboardOverview.tsx` | 1 | private |
| 4 | `SettingsPage.tsx` | 1 | private |
| 5 | `CompanyInfoForm.tsx` | 2 | private |
| 6 | `JobForm.tsx` | 3 | private |
| 7 | `CategoryManager.tsx` | 4 | private |
| 8 | `ApplicationsList.tsx` | 3 | private |
| 9 | `CompaniesPage.tsx` | 1 | private |
| 10 | `TeamJoinPage.tsx` | 1 | private |
| 11 | `LoginBox.tsx` | 5 | public |
| 12 | `SignupBox.tsx` | 2 | public |
| 13 | `CompanySetup.tsx` | 2 | public |
| 14 | `OtpView.tsx` | 0 | delegated |

## Status

| Step | Status |
|------|--------|
| Create plan file | Done |
| Update ARCHITECTURE.md + AGENT.md | Done |
| Migrate common package (10 files) | Done |
| Migrate user-ui (3 files) | Done |
| Run tsc | Done |
