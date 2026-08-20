export interface IGoogleUser {
  googleId: string;
  googleEmail: string;
  googleName?: string;
}

export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string;
  isEmailVerified?: boolean;
  google?: IGoogleUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompany {
  _id: string;
  name: string;
  userName: string;
  creatorUserId: string;
  teamMemberUserIds?: string[];
  logoUrl?: string;
  description?: string;
  websiteUrl?: string;
  plan?: TCompanyPlan;
  planExpiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IGoogleLoginPayload {
  token: string;
  email: string;
  name?: string;
  profilePicture?: string;
}

export interface IRegisterWithCompanyPayload {
  name: string;
  email: string;
  password: string;
  companyName: string;
  companyUserName?: string;
}

export interface ICreateCompanyPayload {
  name: string;
  userName?: string;
  description?: string;
  websiteUrl?: string;
}

export interface ILoginCheckResponse {
  command: "login" | "verify";
}

export interface IUsernameCheckResponse {
  available: boolean;
}

export interface ICompanyListItem extends Omit<ICompany, "creatorUserId"> {
  creatorUserId?: string | Pick<IUser, "_id" | "name" | "email">;
}

export interface IGetCompaniesResponse {
  companies: ICompanyListItem[];
  total: number;
  page: number;
  limit: number;
}

// ─── Company Dashboard Types ─────────────────────────────────────────────────

export interface ITeamMember {
  _id: string;
  name?: string;
  email?: string;
  profilePicture?: string;
}

export interface ITeamMembersResponse {
  owner: ITeamMember;
  members: ITeamMember[];
}

export interface ITeamInviteResponse {
  url: string;
}

// ─── Enums ───────────────────────────────────────────────────────────────────

// Application form field types
export const JOB_APPLICATION_FIELD_TYPES = {
  SHORT_TEXT: "short-text" as const,
  LONG_TEXT: "long-text" as const,
  PHONE_NUMBER: "phone-number" as const,
  EMAIL: "email" as const,
  LINK: "link" as const,
  DOCUMENT_UPLOAD: "document-upload" as const,
};
export const jobApplicationFieldTypes = Object.values(JOB_APPLICATION_FIELD_TYPES);
export type TJobApplicationFieldType = (typeof jobApplicationFieldTypes)[number];
/** @deprecated Use TJobApplicationFieldType instead */
export type TJobFieldType = TJobApplicationFieldType;

export const JOB_APPLICATION_FIELD_TYPE_TEXT_MAP: Record<TJobApplicationFieldType, string> = {
  [JOB_APPLICATION_FIELD_TYPES.SHORT_TEXT]: "Short Text",
  [JOB_APPLICATION_FIELD_TYPES.LONG_TEXT]: "Long Text",
  [JOB_APPLICATION_FIELD_TYPES.PHONE_NUMBER]: "Phone Number",
  [JOB_APPLICATION_FIELD_TYPES.EMAIL]: "Email",
  [JOB_APPLICATION_FIELD_TYPES.LINK]: "Link",
  [JOB_APPLICATION_FIELD_TYPES.DOCUMENT_UPLOAD]: "Document Upload",
};

// Remote options
export const JOB_REMOTE_OPTIONS = {
  ON_SITE: "on-site" as const,
  HYBRID: "hybrid" as const,
  REMOTE: "remote" as const,
};
export const jobRemoteOptions = Object.values(JOB_REMOTE_OPTIONS);
export type TJobRemoteOption = (typeof jobRemoteOptions)[number];

export const JOB_REMOTE_OPTION_TEXT_MAP: Record<TJobRemoteOption, string> = {
  [JOB_REMOTE_OPTIONS.ON_SITE]: "On-site",
  [JOB_REMOTE_OPTIONS.HYBRID]: "Hybrid",
  [JOB_REMOTE_OPTIONS.REMOTE]: "Remote",
};

// Employment types
export const JOB_EMPLOYMENT_TYPES = {
  FULL_TIME: "full-time" as const,
  PART_TIME: "part-time" as const,
  CONTRACT: "contract" as const,
  INTERNSHIP: "internship" as const,
  TEMPORARY: "temporary" as const,
  FREELANCE: "freelance" as const,
};
export const jobEmploymentTypes = Object.values(JOB_EMPLOYMENT_TYPES);
export type TJobEmploymentType = (typeof jobEmploymentTypes)[number];

export const JOB_EMPLOYMENT_TYPE_TEXT_MAP: Record<TJobEmploymentType, string> = {
  [JOB_EMPLOYMENT_TYPES.FULL_TIME]: "Full Time",
  [JOB_EMPLOYMENT_TYPES.PART_TIME]: "Part Time",
  [JOB_EMPLOYMENT_TYPES.CONTRACT]: "Contract",
  [JOB_EMPLOYMENT_TYPES.INTERNSHIP]: "Internship",
  [JOB_EMPLOYMENT_TYPES.TEMPORARY]: "Temporary",
  [JOB_EMPLOYMENT_TYPES.FREELANCE]: "Freelance",
};

// Application statuses
export const JOB_APPLICATION_STATUSES = {
  SUBMITTED: "submitted" as const,
  REVIEWING: "reviewing" as const,
  REJECTED: "rejected" as const,
  HIRED: "hired" as const,
};
export const jobApplicationStatuses = Object.values(JOB_APPLICATION_STATUSES);
export type TJobApplicationStatus = (typeof jobApplicationStatuses)[number];

export const JOB_APPLICATION_STATUS_TEXT_MAP: Record<TJobApplicationStatus, string> = {
  [JOB_APPLICATION_STATUSES.SUBMITTED]: "Submitted",
  [JOB_APPLICATION_STATUSES.REVIEWING]: "Reviewing",
  [JOB_APPLICATION_STATUSES.REJECTED]: "Rejected",
  [JOB_APPLICATION_STATUSES.HIRED]: "Hired",
};

export const JOB_APPLICATION_STATUS_COLOR_MAP: Record<TJobApplicationStatus, string> = {
  [JOB_APPLICATION_STATUSES.SUBMITTED]: "default",
  [JOB_APPLICATION_STATUSES.REVIEWING]: "processing",
  [JOB_APPLICATION_STATUSES.REJECTED]: "error",
  [JOB_APPLICATION_STATUSES.HIRED]: "success",
};

// Hiring stages
export const JOB_HIRING_STAGES = {
  APPLIED: "applied" as const,
  SCREENING: "screening" as const,
  INTERVIEW: "interview" as const,
  EVALUATION: "evaluation" as const,
  OFFER: "offer" as const,
  HIRED: "hired" as const,
  ARCHIVE: "archive" as const,
};
export const jobHiringStages = Object.values(JOB_HIRING_STAGES);
export type TJobHiringStage = (typeof jobHiringStages)[number];

export const JOB_HIRING_STAGE_TEXT_MAP: Record<TJobHiringStage, string> = {
  [JOB_HIRING_STAGES.APPLIED]: "Applied",
  [JOB_HIRING_STAGES.SCREENING]: "Screening",
  [JOB_HIRING_STAGES.INTERVIEW]: "Interview",
  [JOB_HIRING_STAGES.EVALUATION]: "Evaluation",
  [JOB_HIRING_STAGES.OFFER]: "Offer",
  [JOB_HIRING_STAGES.HIRED]: "Hired",
  [JOB_HIRING_STAGES.ARCHIVE]: "Archive",
};

export const JOB_HIRING_STAGE_COLOR_MAP: Record<TJobHiringStage, string> = {
  [JOB_HIRING_STAGES.APPLIED]: "blue",
  [JOB_HIRING_STAGES.SCREENING]: "cyan",
  [JOB_HIRING_STAGES.INTERVIEW]: "purple",
  [JOB_HIRING_STAGES.EVALUATION]: "orange",
  [JOB_HIRING_STAGES.OFFER]: "gold",
  [JOB_HIRING_STAGES.HIRED]: "green",
  [JOB_HIRING_STAGES.ARCHIVE]: "default",
};

// ─── Company Plan ────────────────────────────────────────────────────────────

export const COMPANY_PLAN = {
  FREE: "free" as const,
  BOOTSTRAP: "bootstrap" as const,
  STARTUP: "startup" as const,
  BUSINESS: "business" as const,
};
export const companyPlans = Object.values(COMPANY_PLAN);
export type TCompanyPlan = (typeof companyPlans)[number];

export const COMPANY_PLAN_TEXT_MAP: Record<TCompanyPlan, string> = {
  [COMPANY_PLAN.FREE]: "Free",
  [COMPANY_PLAN.BOOTSTRAP]: "Bootstrap",
  [COMPANY_PLAN.STARTUP]: "Startup",
  [COMPANY_PLAN.BUSINESS]: "Business",
};

export const PLAN_CONFIG: Record<
  TCompanyPlan,
  { price: number; activeJobLimit: number; teamMembers: number }
> = {
  [COMPANY_PLAN.FREE]: { price: 0, activeJobLimit: 2, teamMembers: 0 },
  [COMPANY_PLAN.BOOTSTRAP]: { price: 29, activeJobLimit: 3, teamMembers: Infinity },
  [COMPANY_PLAN.STARTUP]: { price: 49, activeJobLimit: 10, teamMembers: Infinity },
  [COMPANY_PLAN.BUSINESS]: { price: 129, activeJobLimit: 20, teamMembers: Infinity },
};

// ─── Job Status ──────────────────────────────────────────────────────────────

export const JOB_STATUS = {
  ACTIVE: "active" as const,
  DRAFT: "draft" as const,
  CLOSED: "closed" as const,
};
export const jobStatuses = Object.values(JOB_STATUS);
export type TJobStatus = (typeof jobStatuses)[number];

export const JOB_STATUS_TEXT_MAP: Record<TJobStatus, string> = {
  [JOB_STATUS.ACTIVE]: "Active",
  [JOB_STATUS.DRAFT]: "Draft",
  [JOB_STATUS.CLOSED]: "Closed",
};

export const JOB_STATUS_COLOR_MAP: Record<TJobStatus, string> = {
  [JOB_STATUS.ACTIVE]: "success",
  [JOB_STATUS.DRAFT]: "default",
  [JOB_STATUS.CLOSED]: "error",
};

// ─── Subscription Status ─────────────────────────────────────────────────────

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active" as const,
  CANCELLED: "cancelled" as const,
  EXPIRED: "expired" as const,
};
export const subscriptionStatuses = Object.values(SUBSCRIPTION_STATUS);
export type TSubscriptionStatus = (typeof subscriptionStatuses)[number];

export const SUBSCRIPTION_STATUS_TEXT_MAP: Record<TSubscriptionStatus, string> = {
  [SUBSCRIPTION_STATUS.ACTIVE]: "Active",
  [SUBSCRIPTION_STATUS.CANCELLED]: "Cancelled",
  [SUBSCRIPTION_STATUS.EXPIRED]: "Expired",
};

export const SUBSCRIPTION_STATUS_COLOR_MAP: Record<TSubscriptionStatus, string> = {
  [SUBSCRIPTION_STATUS.ACTIVE]: "success",
  [SUBSCRIPTION_STATUS.CANCELLED]: "default",
  [SUBSCRIPTION_STATUS.EXPIRED]: "error",
};

// ─── Billing Cycle ───────────────────────────────────────────────────────────

export const BILLING_CYCLE = {
  MONTHLY: "monthly" as const,
  YEARLY: "yearly" as const,
};
export const billingCycles = Object.values(BILLING_CYCLE);
export type TBillingCycle = (typeof billingCycles)[number];

export const BILLING_CYCLE_TEXT_MAP: Record<TBillingCycle, string> = {
  [BILLING_CYCLE.MONTHLY]: "Monthly",
  [BILLING_CYCLE.YEARLY]: "Yearly",
};

// ─── Subscription / Transaction ──────────────────────────────────────────────

export interface ISubscription {
  _id: string;
  companyId: string;
  plan: TCompanyPlan;
  billingCycle: TBillingCycle;
  amount: number;
  status: TSubscriptionStatus;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBillingSubscriptionResponse {
  plan: TCompanyPlan;
  planExpiresAt?: string;
  planConfig: { price: number; activeJobLimit: number; teamMembers: number };
  activeJobCount: number;
  subscription: ISubscription | null;
}

export interface IBillingTransactionsResponse {
  transactions: ISubscription[];
}

// ─── Domain Types ────────────────────────────────────────────────────────────

export interface IJobCategory {
  _id: string;
  companyId: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IApplicationFormField {
  fieldId: string;
  label: string;
  fieldType: TJobFieldType;
  required: boolean;
  order: number;
}

export interface IHiringStage {
  stageId: string;
  name: string;
  order: number;
}

export interface IJob {
  _id: string;
  companyId: string;
  title: string;
  slug: string;
  category: { categoryId: string; categoryName: string };
  description: string;
  country: string;
  remoteOption: TJobRemoteOption;
  employmentType: TJobEmploymentType;
  applicationForm: IApplicationFormField[];
  stages: IHiringStage[];
  status: TJobStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateJobPayload {
  title: string;
  category: { categoryId: string; categoryName: string };
  description: string;
  country: string;
  remoteOption: TJobRemoteOption;
  employmentType: TJobEmploymentType;
}

export interface IJobApplication {
  _id: string;
  jobId: string;
  applicantId?: string;
  answers: { fieldId: string; value: string }[];
  status: TJobApplicationStatus;
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
