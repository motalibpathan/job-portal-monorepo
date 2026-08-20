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

export type TJobFieldType =
  | "short-text"
  | "long-text"
  | "phone-number"
  | "email"
  | "link"
  | "document-upload";

export type TJobRemoteOption = "on-site" | "hybrid" | "remote";

export type TJobEmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "temporary"
  | "freelance";

export type TJobApplicationStatus =
  | "submitted"
  | "reviewing"
  | "rejected"
  | "hired";

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
