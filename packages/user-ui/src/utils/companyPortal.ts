import { ICompany } from "../types/auth";

const ROOT_URL = import.meta.env.VITE_APP_ROOT_URL || "localhost:3004";

export function slugifyCompanyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

export function isLocalEnvironment(): boolean {
  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function getCompanyPortalUrl(company: ICompany): string {
  if (isLocalEnvironment()) {
    return `/?company=${company.userName}`;
  }
  return `https://${company.userName}.${ROOT_URL}`;
}

const JOB_PORTAL_URL =
  import.meta.env.VITE_JOB_PORTAL_URL || "localhost:3000";

export function getJobPortalUrl(company: ICompany): string {
  if (isLocalEnvironment()) {
    return `http://${company.userName}.localhost:3000`;
  }
  return `https://${company.userName}.${JOB_PORTAL_URL}`;
}
