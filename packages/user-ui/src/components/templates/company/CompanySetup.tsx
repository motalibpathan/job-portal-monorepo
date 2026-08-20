import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Paragraph,
  TextAreaForm,
  TextFieldForm,
  USERNAME_REGEX,
  toast,
  zodSchemaWrapper,
  companySetupSchema,
  checkCompanyUsernameApi,
  createCompanyApi,
} from "@job-portal/common/src";
import type { TCompanySetupInput } from "@job-portal/common/src";
import {
  handlePublicApiError,
} from "@job-portal/common/src/api/errorHandler";
import type { ICommonApiError } from "@job-portal/common/src/api/errorHandler";
import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import { useCompanyContext } from "@job-portal/common/src/HOC/contexts/CompanyContext/useCompanyContext";
import AuthLayout from "../../organisms/signupOrLogin/AuthLayout";
import { getCompanyPortalUrl, slugifyCompanyName } from "../../../utils/companyPortal";

type TUsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

const CompanySetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { setCompany, refreshCompanies } = useCompanyContext();

  const [companyName, setCompanyName] = useState("");
  const [companyUserName, setCompanyUserName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<TUsernameStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof TCompanySetupInput | "submit", string>>>({});
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const validate = zodSchemaWrapper(companySetupSchema);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    if (!usernameTouched && value) {
      setCompanyUserName(slugifyCompanyName(value));
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsernameTouched(true);
    setCompanyUserName(value);
  };

  useEffect(() => {
    const username = companyUserName.trim();
    if (!username) {
      setUsernameStatus("idle");
      return;
    }
    if (username.length < 3 || !USERNAME_REGEX.test(username)) {
      setUsernameStatus("invalid");
      return;
    }

    setUsernameStatus("checking");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await checkCompanyUsernameApi(username);
        setUsernameStatus(res.data.available ? "available" : "taken");
      } catch {
        setUsernameStatus("idle");
      }
    }, 400);
  }, [companyUserName]);

  const createCompanyApiAction = async () => {
    setErrors({});
    if (usernameStatus === "checking") {
      setErrors({ companyUserName: "Please wait while we check the username" });
      return;
    }
    if (companyUserName && usernameStatus === "taken") {
      setErrors({ companyUserName: "This company username is already taken" });
      return;
    }
    const result = validate({
      companyName,
      companyUserName: companyUserName || undefined,
      description: description || undefined,
      websiteUrl: websiteUrl || undefined,
    });
    if (!result.isValid) {
      setErrors(result.errors);
      if (result.message) toast.error(result.message);
      return;
    }
    setLoading(true);
    try {
      const res = await createCompanyApi({
        name: companyName,
        userName: companyUserName || undefined,
        description: description || undefined,
        websiteUrl: websiteUrl || undefined,
      });
      setCompany(res.data);
      refreshCompanies();
      navigate(getCompanyPortalUrl(res.data));
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      const message = data?.message || error || "Failed to create company";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getUsernameHelper = (): { text: string; status: "error" | "success" } | undefined => {
    switch (usernameStatus) {
      case "checking":
        return { text: "Checking availability...", status: "success" };
      case "available":
        return { text: "This username is available", status: "success" };
      case "taken":
        return { text: "This username is already taken", status: "error" };
      case "invalid":
        return {
          text: "Only lowercase letters, numbers and hyphens",
          status: "error",
        };
      default:
        return undefined;
    }
  };

  const usernameHelper = getUsernameHelper();

  return (
    <AuthLayout
      title="Set up your company"
      subtitle={user ? `Welcome${user.name ? `, ${user.name}` : ""}! One last step to get started.` : "One last step to get started"}
    >
      <div className="space-y-4">
        <TextFieldForm
          labelText="Company Name"
          name="companyName"
          required
          placeholder="Acme Inc."
          value={companyName}
          onChange={(e) => handleCompanyNameChange(e.target.value)}
        />

        <TextFieldForm
          labelText="Company Username"
          name="companyUserName"
          placeholder="acme"
          value={companyUserName}
          onChange={(e) => handleUsernameChange(e.target.value)}
          errorMessage={errors.companyUserName}
          helperText={usernameHelper?.text}
        />

        <TextAreaForm
          labelText="Company Description"
          name="description"
          placeholder="What does your company do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <TextFieldForm
          labelText="Website"
          name="websiteUrl"
          placeholder="https://www.example.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <Button
          type="filled"
          color="primary"
          className="w-full"
          size="large"
          loading={loading}
          loadingText="Creating company..."
          onClick={createCompanyApiAction}
        >
          Create company
        </Button>

        {errors.submit ? (
          <Paragraph $level={5} className="!text-danger-main">
            {errors.submit}
          </Paragraph>
        ) : null}
      </div>
    </AuthLayout>
  );
};

export default CompanySetup;
