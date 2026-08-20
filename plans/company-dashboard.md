# Company Dashboard - Frontend Plan

## Overview

jobspage.co-style company dashboard with 6 pages. Replaces all `PagePlaceholder` stubs.

## Key Design Decisions

1. **Single save for job form**: Hiring stages + application form saved via `PUT /:userName/jobs/:slug` (one API call)
2. **Per-company categories**: Categories are scoped to each company (created on company registration)
3. **Stats via backend**: Dashboard stats fetched from `GET /:userName/stats` endpoint
4. **Default application form**: New jobs start with 2 default fields (Name, Email/Resume)
5. **Job slugs**: Jobs use human-readable slugs in URLs (e.g. `/companies/acme/jobs/frontend-developer/edit`) instead of MongoDB ObjectIds. Slugs are auto-generated from title, unique per company.

## Pages

### 1. Dashboard Overview (`/companies/:userName/dashboard`)

**Layout**: 4 stat cards + recent applications table

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Active Jobs  │ Total Apps   │ Closed Jobs  │  Total Jobs  │
│     12       │     48       │      3       │     15       │
└──────────────┴──────────────┴──────────────┴──────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Recent Applications                                         │
│ ID          │ Job ID        │ Date     │ Status             │
│ a1b2c3d4    │ d4e5f6g7      │ Jan 15   │ [Submitted]        │
└─────────────────────────────────────────────────────────────┘
```

**API**: `GET /api/:userName/stats`

**Files**:
- `common/src/components/templates/companyDashboard/DashboardOverview.tsx`

---

### 2. Jobs List (`/companies/:userName/jobs`)

**Layout**: Table with status badges, actions

```
┌─────────────────────────────────────────────────────────────┐
│ Jobs                                        [+ Create Job]  │
│ Title        │ Category    │ Location │ Type    │ Actions   │
│ Developer    │ IT          │ Remote   │ Full    │ Edit Del  │
└─────────────────────────────────────────────────────────────┘
```

**API**: `GET /api/:userName/jobs`, `DELETE /api/:userName/jobs/:slug`

**Files**:
- `common/src/components/templates/companyDashboard/JobsList.tsx`

---

### 3. Job Create/Edit (`/companies/:userName/jobs/create`, `/:slug/edit`)

**Layout**: Tabbed form (Ant Design `Tabs`)

```
┌─────────────────────────────────────────────────────────────┐
│ [Job Details]  [Application Form]  [Hiring Stages]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  (Active tab content renders here)                          │
│  Tab 1: Title, Category, Description, Country, Emp, Remote │
│  Tab 2: Add/remove/reorder fields, toggle required          │
│  Tab 3: Add/remove/reorder stages, reset to defaults        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ [Cancel]  [Save as Draft]  [Publish]                       │
└─────────────────────────────────────────────────────────────┘
```

- Form state shared across tabs via single `useForm()` wrapping the page
- Free tab navigation (no sequential requirement)
- Validation errors show badge on tab header

**API**: `POST /api/:userName/jobs`, `PUT /api/:userName/jobs/:slug`

**Files**:
- `common/src/components/templates/companyDashboard/JobForm.tsx`
- `common/src/components/templates/companyDashboard/ApplicationFormBuilder.tsx`
- `common/src/components/templates/companyDashboard/HiringStageBuilder.tsx`

---

### 4. Applications (`/companies/:userName/applications`)

**Layout**: Filterable table

```
┌─────────────────────────────────────────────────────────────┐
│ Applications                                                │
│ Filter: [All Jobs ▼] [All Statuses ▼]                       │
│ Candidate      │ Job           │ Applied  │ Status          │
└─────────────────────────────────────────────────────────────┘
```

**API**: `GET /api/:userName/jobs` (filter), `GET /api/:userName/jobs/:slug/applications`, `PATCH /api/:userName/jobs/:slug/applications/:id/status`

**Files**:
- `common/src/components/templates/companyDashboard/ApplicationsList.tsx`

---

### 5. Company Info (`/companies/:userName/company`)

**Layout**: Edit form (name, description, logo, website)

**API**: `PUT /api/companies/:userName`

**Files**:
- `common/src/components/templates/companyDashboard/CompanyInfoForm.tsx`

---

### 6. Settings (`/companies/:userName/settings`)

**Layout**: Category manager + danger zone

```
┌─────────────────────────────────────────────────────────────┐
│ Job Categories                                              │
│ IT & Software Development              [Edit] [Delete]      │
│ Sales & Marketing                      [Edit] [Delete]      │
│ [+ Add Category]                                            │
├─────────────────────────────────────────────────────────────┤
│ Danger Zone                                                 │
│ [Delete Company]                                            │
└─────────────────────────────────────────────────────────────┘
```

**API**: `GET/POST/PUT/DELETE /api/job-categories`, `DELETE /api/companies/:userName`

**Files**:
- `common/src/components/templates/companyDashboard/SettingsPage.tsx`
- `common/src/components/templates/companyDashboard/CategoryManager.tsx`

---

## Types (`common/src/api/userApi/types.ts`)

```ts
export interface IJobCategory {
  _id: string;
  companyId: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IJob {
  _id: string;
  companyId: string;
  title: string;
  slug: string;
  category: { categoryId: string; categoryName: string };
  description: string;
  country: string;
  remoteOption: "on-site" | "hybrid" | "remote";
  employmentType: "full-time" | "part-time" | "contract" | "internship" | "temporary" | "freelance";
  applicationForm: IApplicationFormField[];
  stages: IHiringStage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IApplicationFormField {
  fieldId: string;
  label: string;
  fieldType: "short-text" | "long-text" | "phone-number" | "email" | "link" | "document-upload";
  required: boolean;
  order: number;
}

export interface IHiringStage {
  stageId: "applied" | "screening" | "interview" | "evaluation" | "offer" | "hired" | "archive";
  name: string;
  order: number;
}

export interface IJobApplication {
  _id: string;
  jobId: string;
  applicantId?: string;
  answers: { fieldId: string; value: string }[];
  status: "submitted" | "reviewing" | "rejected" | "hired";
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompanyStats {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  recentApplications: IJobApplication[];
}
```

---

## API Functions (`common/src/api/userApi/userApi.ts`)

```ts
// Job Categories (per-company)
getJobCategoriesApi(userName: string)
createJobCategoryApi(userName: string, data: { name: string, companyId: string })
updateJobCategoryApi(categoryId: string, data: { name: string })
deleteJobCategoryApi(categoryId: string)

// Jobs
getCompanyJobsApi(userName: string)
getCompanyJobApi(userName: string, slug: string)
createCompanyJobApi(userName: string, data: CreateJobPayload)
updateCompanyJobApi(userName: string, slug: string, data: Partial<CreateJobPayload>)
deleteCompanyJobApi(userName: string, slug: string)

// Applications
getJobApplicationsApi(userName: string, slug: string)
updateApplicationStatusApi(userName: string, slug: string, applicationId: string, status: string)

// Company
updateCompanyApi(userName: string, data: Partial<ICreateCompanyPayload>)
deleteCompanyApi(userName: string)

// Stats
getCompanyStatsApi(userName: string)
```

---

## Route Constants (`common/src/HOC/routes/routes.ts`)

```ts
COMPANY_DASHBOARD(userName)  => /companies/:userName/dashboard
COMPANY_JOBS(userName)       => /companies/:userName/jobs
COMPANY_JOB_CREATE(userName) => /companies/:userName/jobs/create
COMPANY_JOB_EDIT(userName, slug) => /companies/:userName/jobs/:slug/edit
COMPANY_APPLICATIONS(userName) => /companies/:userName/applications
COMPANY_INFO(userName)       => /companies/:userName/company
COMPANY_SETTINGS(userName)   => /companies/:userName/settings
```

---

## Default Categories (prefilled per company)

When a company is created, these 8 categories are seeded:

1. IT & Software Development
2. Sales & Marketing
3. Administration & Operations
4. Customer Service
5. Design & Creative
6. Finance & Accounting
7. Human Resources
8. Legal

---

## Implementation Phases

| Phase | Pages | Status |
|-------|-------|--------|
| **Phase 1** | Jobs List + Job Create/Edit (with form builder + stages) | Done |
| **Phase 2** | Applications List + status management | Done |
| **Phase 3** | Dashboard Overview (stats) | Done |
| **Phase 4** | Company Info + Settings (category manager) | Done |
| **Phase 5** | Router wiring (replace PagePlaceholder) | Done |
| **Phase 6** | Job slugs (URL-friendly identifiers) | Done |
