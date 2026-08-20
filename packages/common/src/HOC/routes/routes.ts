// ─── App routes ──────────────────────────────────────────────────────────────

// Auth
export const LOGIN = "/login";
export const REGISTER = "/register";
export const FORGOT_PASSWORD = "/forgot-password";
export const RESET_PASSWORD = "/reset-password";

// Common
export const HOME = "/";
export const NOT_FOUND = "/404";
export const ONBOARDING_COMPANY = "/onboarding/company";
export const PRICING = "/pricing";

// User portal
export const JOBS = "/jobs";
export const JOB_DETAIL = (jobId: string) => `/jobs/${jobId}`;
export const MY_APPLICATIONS = "/my-applications";
export const MY_PROFILE = "/profile";

// Company dashboard
export const COMPANIES = "/companies";
export const COMPANY_DASHBOARD = (userName: string) =>
  `/companies/${userName}/dashboard`;
export const COMPANY_JOBS = (userName: string) => `/companies/${userName}/jobs`;
export const COMPANY_JOB_CREATE = (userName: string) =>
  `/companies/${userName}/jobs/create`;
export const COMPANY_JOB_EDIT = (userName: string, slug: string) =>
  `/companies/${userName}/jobs/${slug}/edit`;
export const COMPANY_APPLICATIONS = (userName: string) =>
  `/companies/${userName}/applications`;
export const COMPANY_INFO = (userName: string) =>
  `/companies/${userName}/company`;
export const COMPANY_TEAM = (userName: string) =>
  `/companies/${userName}/team`;
export const COMPANY_TEAM_JOIN = (userName: string) =>
  `/companies/${userName}/team/join`;
export const COMPANY_SETTINGS = (userName: string) =>
  `/companies/${userName}/settings`;
export const COMPANY_BILLING = (userName: string) =>
  `/companies/${userName}/billing`;
export const COMPANY_VIEW_JOBS_PAGE = (userName: string) =>
  `/companies/${userName}/view-jobs-page`;

// Admin portal
export const ADMIN_HOME = "/admin";
export const ADMIN_JOBS = "/admin/jobs";
export const ADMIN_JOB_CREATE = "/admin/jobs/create";
export const ADMIN_JOB_EDIT = (jobId: string) => `/admin/jobs/${jobId}/edit`;
export const ADMIN_COMPANIES = "/admin/companies";
export const ADMIN_COMPANY_CREATE = "/admin/companies/create";
export const ADMIN_COMPANY_EDIT = (companyId: string) =>
  `/admin/companies/${companyId}/edit`;
export const ADMIN_APPLICATIONS = "/admin/applications";
export const ADMIN_USERS = "/admin/users";
