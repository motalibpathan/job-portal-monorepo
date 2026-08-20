// ─── API ──────────────────────────────────────────────────────────────────────
export * from "./api";

// ─── Utils ────────────────────────────────────────────────────────────────────
export { cn } from "./utils/cn";
export { toast } from "./utils/toast";
export { EMAIL_FORMAT_REGEX, USERNAME_REGEX } from "./utils/regex";
export { getErrorMessage } from "./utils/error";

// ─── Validators ──────────────────────────────────────────────────────────────
export { zodSchemaWrapper } from "./validators/validatorHelpers";
export type { TValidationError, TValidationResult } from "./validators/validatorHelpers";
export {
  signupSchema,
  companySetupSchema,
  companyInfoSchema,
  jobFormSchema,
  otpSchema,
} from "./validators/job";
export type {
  TSignupInput,
  TCompanySetupInput,
  TCompanyInfoInput,
  TJobFormInput,
  TOtpInput,
} from "./validators/job";

// ─── Enums ───────────────────────────────────────────────────────────────────
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
} from "./api/userApi/types";
export type {
  TJobApplicationFieldType,
  TJobFieldType,
  TJobRemoteOption,
  TJobEmploymentType,
  TJobApplicationStatus,
  TJobHiringStage,
} from "./api/userApi/types";

// ─── Atoms: Buttons ───────────────────────────────────────────────────────────
export { Button } from "./components/atoms/buttons";
export type { IButtonProps, TButtonType, TButtonColor } from "./components/atoms/buttons";

// ─── Atoms: Typography ────────────────────────────────────────────────────────
export { Heading } from "./components/atoms/typography/heading";
export { Paragraph } from "./components/atoms/typography/paragraph";
export { Title } from "./components/atoms/typography/title";
export { Subtitle } from "./components/atoms/typography/subtitle";
export { Label, FormLabel } from "./components/atoms/typography/label";
export { Caption } from "./components/atoms/typography/caption";
export type { IParagraphProps } from "./components/atoms/typography/paragraph";
export type { TLabelLevel } from "./components/atoms/typography/label";

// ─── Atoms: Inputs ────────────────────────────────────────────────────────────
export {
  TextField,
  PasswordField,
  Checkbox,
  TextArea,
  AutoCompleteTextField,
  NumberField,
  RadioInput,
  Toggle,
} from "./components/atoms/inputs";
export type { ICheckboxProps, IRadioProps } from "./components/atoms/inputs";

// ─── Atoms: Form ─────────────────────────────────────────────────────────────
export { Form, FormItem, FormList, useForm, useWatch } from "./components/atoms/form";
export type { IFormProps } from "./components/atoms/form";

// ─── Atoms: Selects ───────────────────────────────────────────────────────────
export { Select, Option, OptGroup } from "./components/atoms/selects";
export type { ISelectProps } from "./components/atoms/selects";

// ─── Atoms: Modals ────────────────────────────────────────────────────────────
export { Modal } from "./components/atoms/modals";
export type { IModalProps } from "./components/atoms/modals";

// ─── Atoms: Icons ────────────────────────────────────────────────────────────
export { TrashIcon } from "./components/atoms/icons";

// ─── Molecules: Form ──────────────────────────────────────────────────────────
export { FormField } from "./components/molecules/form";
export type { IFormFieldProps } from "./components/molecules/form";

// ─── Molecules: Inputs ────────────────────────────────────────────────────────
export { TextFieldForm } from "./components/molecules/inputs/textField";
export { TextAreaForm } from "./components/molecules/inputs/textArea";
export { PasswordFieldForm } from "./components/molecules/inputs/passwordField";
export { NumberFieldForm } from "./components/molecules/inputs/numberField";
export { AutoCompleteTextFieldForm } from "./components/molecules/inputs/autoCompleteText";
export { RightLabeledCheckbox } from "./components/molecules/inputs/checkbox";
export { RadioGroup, RightLabeledRadio } from "./components/molecules/inputs/radio";
export { LabeledToggle } from "./components/molecules/inputs/toggle";
export { default as SelectionControl } from "./components/molecules/inputs/selectionControl";
export { SelectForm } from "./components/molecules/selects";
export type { ISelectFormProps } from "./components/molecules/selects";
export { Message } from "./components/molecules/texts/message";

// ─── HOC / Routes ────────────────────────────────────────────────────────────
export { PrivateRoute } from "./HOC/routes/PrivateRoute";
export * from "./HOC/routes/routes";

// ─── HOC / Contexts ──────────────────────────────────────────────────────────
export { CompanyProvider } from "./HOC/contexts/CompanyContext/CompanyProvider";
export type { ICompanyContext } from "./HOC/contexts/CompanyContext/CompanyProvider";
export { useCompanyContext } from "./HOC/contexts/CompanyContext/useCompanyContext";

// ─── Types ───────────────────────────────────────────────────────────────────
export type { ILayoutProps, IDashboardLayoutProps, TLayoutMaxWidth } from "./types";

// ─── Layouts ─────────────────────────────────────────────────────────────────
export { BlankLayout } from "./components/layouts/BlankLayout";
export { DashboardLayout } from "./components/layouts/DashboardLayout";
export { CompanyDashboardLayout } from "./components/layouts/CompanyDashboardLayout";

// ─── Templates ───────────────────────────────────────────────────────────────
export { default as ErrorElement } from "./components/templates/errorElement/ErrorElement";
export { default as CompaniesPage } from "./components/templates/companies/CompaniesPage";
export { default as PagePlaceholder } from "./components/templates/pagePlaceholder/PagePlaceholder";
export { default as JobsList } from "./components/templates/companyDashboard/JobsList";
export { default as JobForm } from "./components/templates/companyDashboard/JobForm";
