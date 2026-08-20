import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";
import {
  FileTextOutlined,
  FormOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { TextFieldForm } from "../../molecules/inputs/textField";
import { TextAreaForm } from "../../molecules/inputs/textArea";
import { SelectForm } from "../../molecules/selects";
import {
  getCompanyJobApi,
  createCompanyJobApi,
  updateCompanyJobApi,
  getJobCategoriesApi,
} from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { COMPANY_JOBS } from "../../../HOC/routes/routes";
import { toast } from "../../../utils/toast";
import { zodSchemaWrapper, jobFormSchema } from "../../../validators";
import ApplicationFormBuilder from "./ApplicationFormBuilder";
import HiringStageBuilder from "./HiringStageBuilder";
import type {
  IApplicationFormField,
  IHiringStage,
  IJobCategory,
  ICreateJobPayload,
} from "../../../api/userApi/types";

const REMOTE_OPTIONS = [
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
];

const EMPLOYMENT_OPTIONS = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
  { value: "freelance", label: "Freelance" },
];

const DEFAULT_APPLICATION_FORM: IApplicationFormField[] = [
  { fieldId: "field_name", label: "Full Name", fieldType: "short-text", required: true, order: 0 },
  { fieldId: "field_email", label: "Email", fieldType: "email", required: true, order: 1 },
];

const DEFAULT_STAGES: IHiringStage[] = [
  { stageId: "applied", name: "Applied", order: 1 },
  { stageId: "screening", name: "Screening", order: 2 },
  { stageId: "interview", name: "Interview", order: 3 },
  { stageId: "evaluation", name: "Evaluation", order: 4 },
  { stageId: "offer", name: "Offer", order: 5 },
  { stageId: "hired", name: "Hired", order: 6 },
  { stageId: "archive", name: "Archive", order: 7 },
];

const JobForm: React.FC = () => {
  const { userName, slug } = useParams<{ userName: string; slug: string }>();
  const navigate = useNavigate();
  const { onLogout } = useAuthContext();
  const isEditing = Boolean(slug);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<IJobCategory[]>([]);

  // Job details
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [remoteOption, setRemoteOption] = useState<string>("on-site");
  const [employmentType, setEmploymentType] = useState<string>("full-time");

  // Application form & stages
  const [applicationForm, setApplicationForm] = useState<IApplicationFormField[]>(DEFAULT_APPLICATION_FORM);
  const [stages, setStages] = useState<IHiringStage[]>(DEFAULT_STAGES);

  const validate = zodSchemaWrapper(jobFormSchema);

  const getJobCategoriesApiAction = useCallback(async () => {
    if (!userName) return;
    try {
      const resp = await getJobCategoriesApi(userName);
      setCategories(resp.data);
    } catch {
      // non-critical, ignore
    }
  }, [userName]);

  const getCompanyJobApiAction = useCallback(async () => {
    if (!userName || !slug) return;
    setLoading(true);
    try {
      const resp = await getCompanyJobApi(userName, slug);
      const job = resp.data;
      setTitle(job.title);
      setCategoryId(job.category?.categoryId ?? "");
      setCategoryName(job.category?.categoryName ?? "");
      setDescription(job.description);
      setCountry(job.country);
      setRemoteOption(job.remoteOption);
      setEmploymentType(job.employmentType);
      setApplicationForm(
        job.applicationForm?.length ? job.applicationForm : DEFAULT_APPLICATION_FORM,
      );
      setStages(job.stages?.length ? job.stages : DEFAULT_STAGES);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load job");
    } finally {
      setLoading(false);
    }
  }, [userName, slug, onLogout]);

  useEffect(() => {
    getJobCategoriesApiAction();
    if (isEditing) getCompanyJobApiAction();
  }, [getJobCategoriesApiAction, getCompanyJobApiAction, isEditing]);

  const handleCategoryChange = (value: string) => {
    const cat = categories.find((c) => c._id === value);
    setCategoryId(value);
    setCategoryName(cat?.name ?? "");
  };

  const buildPayload = (): ICreateJobPayload => ({
    title,
    category: { categoryId, categoryName },
    description,
    country,
    remoteOption: remoteOption as ICreateJobPayload["remoteOption"],
    employmentType: employmentType as ICreateJobPayload["employmentType"],
  });

  const saveJobApiAction = async (_status?: "draft" | "published") => {
    if (!userName) return;
    const result = validate({
      title: title.trim(),
      categoryId,
      description,
      country,
      remoteOption,
      employmentType,
    });
    if (!result.isValid) {
      if (result.message) toast.error(result.message);
      return;
    }

    setSaving(true);
    try {
      if (isEditing && slug) {
        await updateCompanyJobApi(userName, slug, {
          ...buildPayload(),
          applicationForm,
          stages,
        });
        toast.success("Job updated");
      } else {
        const resp = await createCompanyJobApi(userName, buildPayload());
        // Save application form and stages in a second call
        await updateCompanyJobApi(userName, resp.data.slug, {
          applicationForm,
          stages,
        });
        toast.success("Job created");
      }
      navigate(COMPANY_JOBS(userName));
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const tabItems = [
    {
      key: "details",
      label: (
        <span className="flex items-center gap-2">
          <FileTextOutlined />
          Job Details
        </span>
      ),
      children: (
        <div className="max-w-2xl space-y-5 pt-4">
          <TextFieldForm
            labelText="Job Title"
            name="title"
            required
            placeholder="e.g. Senior Software Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <SelectForm
            labelText="Category"
            name="category"
            required
            placeholder="Select category"
            value={categoryId || undefined}
            onChange={handleCategoryChange}
            options={categories.map((cat) => ({
              value: cat._id,
              label: cat.name,
            }))}
            size="large"
          />

          <TextAreaForm
            labelText="Description"
            name="description"
            placeholder="Describe the role, responsibilities, and requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
            <TextFieldForm
              labelText="Country"
              name="country"
              placeholder="e.g. United States"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <SelectForm
              labelText="Employment Type"
              name="employmentType"
              value={employmentType}
              onChange={(val: string) => setEmploymentType(val)}
              options={EMPLOYMENT_OPTIONS}
            />

            <SelectForm
              labelText="Remote Option"
              name="remoteOption"
              value={remoteOption}
              onChange={(val: string) => setRemoteOption(val)}
              options={REMOTE_OPTIONS}
            />
          </div>
        </div>
      ),
    },
    {
      key: "application-form",
      label: (
        <span className="flex items-center gap-2">
          <FormOutlined />
          Application Form
        </span>
      ),
      children: (
        <div className="pt-4">
          <ApplicationFormBuilder
            fields={applicationForm}
            onChange={setApplicationForm}
          />
        </div>
      ),
    },
    {
      key: "hiring-stages",
      label: (
        <span className="flex items-center gap-2">
          <NodeIndexOutlined />
          Hiring Stages
        </span>
      ),
      children: (
        <div className="pt-4">
          <HiringStageBuilder stages={stages} onChange={setStages} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Heading $level={4}>
        {isEditing ? "Edit Job" : "Create Job"}
      </Heading>

      <div className="rounded-2xl border border-borders-light-1 bg-white p-6">
        <Tabs defaultActiveKey="details" items={tabItems} />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="outlined"
          color="gray"
          onClick={() => navigate(COMPANY_JOBS(userName ?? ""))}
        >
          Cancel
        </Button>
        <Button
          type="filled"
          color="gray"
          loading={saving}
          onClick={() => saveJobApiAction("draft")}
        >
          Save as Draft
        </Button>
        <Button
          type="filled"
          color="primary"
          loading={saving}
          onClick={() => saveJobApiAction("published")}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default JobForm;
