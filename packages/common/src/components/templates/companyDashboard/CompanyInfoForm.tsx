import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { TextFieldForm } from "../../molecules/inputs/textField";
import { TextAreaForm } from "../../molecules/inputs/textArea";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { updateCompanyApi } from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { toast } from "../../../utils/toast";
import { zodSchemaWrapper, companyInfoSchema } from "../../../validators";
import type { TCompanyInfoInput } from "../../../validators";

const CompanyInfoForm: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();
  const { company, setCompany, refreshCompanies } = useCompanyContext();
  const { onLogout } = useAuthContext();

  const [loading, setLoading] = useState(!company);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(company?.name ?? "");
  const [description, setDescription] = useState(company?.description ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(company?.websiteUrl ?? "");
  const [logoUrl, setLogoUrl] = useState(company?.logoUrl ?? "");
  const [errors, setErrors] = useState<Partial<Record<keyof TCompanyInfoInput, string>>>({});

  const validate = zodSchemaWrapper(companyInfoSchema);

  const refreshCompaniesAction = useCallback(async () => {
    if (company) {
      setName(company.name);
      setDescription(company.description ?? "");
      setWebsiteUrl(company.websiteUrl ?? "");
      setLogoUrl(company.logoUrl ?? "");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const companies = await refreshCompanies();
      const found = companies.find((c) => c.userName === userName);
      if (found) {
        setName(found.name);
        setDescription(found.description ?? "");
        setWebsiteUrl(found.websiteUrl ?? "");
        setLogoUrl(found.logoUrl ?? "");
      }
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load company info");
    } finally {
      setLoading(false);
    }
  }, [company, userName, refreshCompanies, onLogout]);

  useEffect(() => {
    refreshCompaniesAction();
  }, [refreshCompaniesAction]);

  const updateCompanyApiAction = async () => {
    if (!userName) return;
    const result = validate({
      name: name.trim(),
      description: description.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
      logoUrl: logoUrl.trim() || undefined,
    });
    if (!result.isValid) {
      setErrors(result.errors);
      if (result.message) toast.error(result.message);
      return;
    }

    setSaving(true);
    try {
      const resp = await updateCompanyApi(userName, {
        name: name.trim(),
        description: description.trim() || undefined,
        websiteUrl: websiteUrl.trim() || undefined,
      });
      setCompany(resp.data);
      await refreshCompanies();
      toast.success("Company info updated");
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to update company info");
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

  return (
    <div className="space-y-6">
      <Heading $level={4}>Company Info</Heading>

      <div className="max-w-2xl space-y-5 rounded-2xl border border-borders-light-1 bg-white p-6">
        <TextFieldForm
          labelText="Company Name"
          name="companyName"
          required
          placeholder="e.g. Acme Corp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          errorMessage={errors.name}
        />

        <TextAreaForm
          labelText="Description"
          name="description"
          placeholder="Tell candidates about your company..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <TextFieldForm
          labelText="Website URL"
          name="websiteUrl"
          placeholder="https://example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <TextFieldForm
          labelText="Logo URL"
          name="logoUrl"
          placeholder="https://example.com/logo.png"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="outlined"
          color="gray"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="filled"
          color="primary"
          loading={saving}
          onClick={updateCompanyApiAction}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
