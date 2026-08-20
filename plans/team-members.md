# Team Members - Frontend Plan

## Overview

Owner invites team members via a single-use invite link. Team members get full dashboard access except managing members and deleting company.

## Invite Flow

1. Logged-in user clicks invite link → joins team → redirected to company dashboard
2. Not logged-in user clicks invite link → redirected to login (`?redirectTo=/companies/:userName/team/join?token=xxx`) → user chooses login or register → after auth → navigates to redirectTo → auto-joins team → goes to company dashboard

## Pages

### Team Members (`/companies/:userName/team`)

```
┌─────────────────────────────────────────────────────────┐
│ Team Members                                             │
│                                                          │
│ Owner                                                    │
│ 👤 John Doe (john@acme.com)                              │
│                                                          │
│ Members                                                  │
│ 👤 Jane Smith (jane@acme.com)               [Remove]     │
│ 👤 Bob Wilson (bob@acme.com)                [Remove]     │
│                                                          │
│ ─────────────────────────────────────────────────────── │
│ Invite Link                                    [owner]   │
│ [Generate Link]                                          │
│ ┌──────────────────────────────────────┐ [Copy]          │
│ │ https://domain/companies/acme/       │                 │
│ │ team/join?token=abc123...            │                 │
│ └──────────────────────────────────────┘                 │
│ Link expires in 3 days. Single-use.                      │
└─────────────────────────────────────────────────────────┘
```

- Owner sees: generate link, remove members
- Members see: list only (no invite/remove UI)

**API**: `GET /api/companies/:userName/team`, `POST /api/companies/:userName/team/invite`

**Files**:
- `common/src/components/templates/companyDashboard/TeamMembersPage.tsx`

### Team Join (`/companies/:userName/team/join?token=xxx`)

- Reads `?token=` from URL
- Calls `POST /api/companies/:userName/team/join`
- Success → redirect to company dashboard
- Error → show error (expired, invalid, already used, already a member)

**API**: `POST /api/companies/:userName/team/join`

**Files**:
- `common/src/components/templates/companyDashboard/TeamJoinPage.tsx`

## Route Constants

```ts
COMPANY_TEAM(userName)      => /companies/:userName/team
COMPANY_TEAM_JOIN(userName) => /companies/:userName/team/join
```

## Types

```ts
interface ITeamMember { _id, name?, email?, profilePicture? }
interface ITeamMembersResponse { owner: ITeamMember, members: ITeamMember[] }
interface ITeamInviteResponse { url: string }
// Added to ICompany: teamMemberUserIds?: string[]
```

## API Functions

```ts
getCompanyTeamApi(userName)
generateTeamInviteApi(userName)
joinTeamApi(userName, token)
```

## Sidebar Nav

Add "Team" item (`TeamOutlined` icon) between "Company" and "Settings".

## Login Redirect Fix

`LoginBox.tsx`: read `?redirectTo=` from URL, navigate there after auth.

## Files

| File | Action |
|------|--------|
| `common/src/HOC/routes/routes.ts` | Add `COMPANY_TEAM`, `COMPANY_TEAM_JOIN` |
| `common/src/api/userApi/types.ts` | Add team types, update `ICompany` |
| `common/src/api/userApi/userApi.ts` | Add team API functions |
| `common/src/components/templates/companyDashboard/TeamMembersPage.tsx` | **New** |
| `common/src/components/templates/companyDashboard/TeamJoinPage.tsx` | **New** |
| `common/src/components/templates/companyDashboard/index.ts` | Add barrel exports |
| `common/src/components/layouts/CompanyDashboardLayout.tsx` | Add Team nav item |
| `user-ui/src/HOC/routes/Router.tsx` | Add team + join routes |
| `user-ui/src/components/templates/login/LoginBox.tsx` | Fix redirectTo handling |

## Implementation Order

1. Add route constants — Done
2. Add frontend types — Done
3. Add API functions — Done
4. Create TeamMembersPage — Done
5. Create TeamJoinPage — Done
6. Add barrel exports — Done
7. Update sidebar nav — Done
8. Add routes to Router — Done
9. Fix LoginBox redirect — Done
