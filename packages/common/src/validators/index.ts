export { zodSchemaWrapper } from "./validatorHelpers";
export type { TValidationError, TValidationResult } from "./validatorHelpers";

export {
  signupSchema,
  companySetupSchema,
  companyInfoSchema,
  jobFormSchema,
  otpSchema,
} from "./job";
export type {
  TSignupInput,
  TCompanySetupInput,
  TCompanyInfoInput,
  TJobFormInput,
  TOtpInput,
} from "./job";

// ─── Enums (re-exported from types for convenience) ──────────────────────────
export {
  JOB_APPLICATION_FIELD_TYPES,
  jobApplicationFieldTypes,
  JOB_APPLICATION_FIELD_TYPE_TEXT_MAP,
  JOB_REMOTE_OPTIONS,
  jobRemoteOptions,
  JOB_REMOTE_OPTION_TEXT_MAP,
  JOB_EMPLOYMENT_TYPES,
  jobEmploymentTypes,
  JOB_EMPLOYMENT_TYPE_TEXT_MAP,
  JOB_APPLICATION_STATUSES,
  jobApplicationStatuses,
  JOB_APPLICATION_STATUS_TEXT_MAP,
  JOB_APPLICATION_STATUS_COLOR_MAP,
  JOB_HIRING_STAGES,
  jobHiringStages,
  JOB_HIRING_STAGE_TEXT_MAP,
  JOB_HIRING_STAGE_COLOR_MAP,
} from "../api/userApi/types";
export type {
  TJobApplicationFieldType,
  TJobFieldType,
  TJobRemoteOption,
  TJobEmploymentType,
  TJobApplicationStatus,
  TJobHiringStage,
} from "../api/userApi/types";
