import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Paragraph,
  PasswordFieldForm,
  TextFieldForm,
  toast,
  zodSchemaWrapper,
  signupSchema,
  userSignupApi,
  userGoogleLoginApi,
} from "@job-portal/common/src";
import type { TSignupInput } from "@job-portal/common/src";
import {
  handlePublicApiError,
} from "@job-portal/common/src/api/errorHandler";
import type { ICommonApiError } from "@job-portal/common/src/api/errorHandler";
import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import { useCompanyContext } from "@job-portal/common/src/HOC/contexts/CompanyContext/useCompanyContext";
import {
  COMPANIES,
  COMPANY_DASHBOARD,
  ONBOARDING_COMPANY,
} from "@job-portal/common/src/HOC/routes/routes";
import type { ICompany, IGoogleLoginPayload } from "../../../types/auth";
import GoogleLoginButton from "../../google/GoogleLoginButton";

const SignupBox: React.FC = () => {
  const navigate = useNavigate();
  const { loginUserOnCredentialsAction } = useAuthContext();
  const { refreshCompanies } = useCompanyContext();

  const redirect = (companies: ICompany[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectTo = searchParams.get("redirectTo");

    if (redirectTo) {
      navigate(redirectTo);
    } else if (companies.length === 0) {
      navigate(ONBOARDING_COMPANY);
    } else if (companies.length === 1) {
      navigate(COMPANY_DASHBOARD(companies[0].userName));
    } else {
      navigate(COMPANIES);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof TSignupInput | "submit", string>>>({});
  const [loading, setLoading] = useState(false);

  const validate = zodSchemaWrapper(signupSchema);

  const finishAuth = async (
    accessToken: string,
    refreshToken: string,
    user: any,
  ) => {
    loginUserOnCredentialsAction({ accessToken, refreshToken, user });
    const companies = await refreshCompanies();
    redirect(companies);
  };

  const userSignupApiAction = async () => {
    setErrors({});
    const result = validate({ name: name.trim(), email: email.trim(), password });
    if (!result.isValid) {
      setErrors(result.errors);
      if (result.message) toast.error(result.message);
      return;
    }
    setLoading(true);
    try {
      const res = await userSignupApi({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      await finishAuth(
        res.data.accessToken,
        res.data.refreshToken,
        res.data.user,
      );
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      const message = data?.message || error || "Registration failed";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const userGoogleLoginApiAction = async (payload: IGoogleLoginPayload) => {
    setErrors({});
    setLoading(true);
    try {
      const res = await userGoogleLoginApi(payload);
      await finishAuth(
        res.data.accessToken,
        res.data.refreshToken,
        res.data.user,
      );
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      const message = data?.message || error || "Google login failed";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <TextFieldForm
        labelText="Full Name"
        name="name"
        required
        placeholder="Jane Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMessage={errors.name}
      />

      <TextFieldForm
        labelText="Email"
        name="email"
        required
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={errors.email}
      />

      <PasswordFieldForm
        labelText="Password"
        name="password"
        required
        placeholder="At least 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={errors.password}
      />

      <Button
        type="filled"
        color="primary"
        className="w-full"
        size="large"
        loading={loading}
        loadingText="Creating account..."
        onClick={userSignupApiAction}
      >
        Create account
      </Button>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-borders-light-1" />
        <Paragraph $level={5} $typographyPalette="subtitle">
          or
        </Paragraph>
        <span className="h-px flex-1 bg-borders-light-1" />
      </div>

      <GoogleLoginButton onCredential={userGoogleLoginApiAction} />

      {errors.submit ? (
        <Paragraph $level={5} className="text-danger-main!">
          {errors.submit}
        </Paragraph>
      ) : null}

      <div className="text-center">
        <Paragraph $level={5}>
          Already have an account?{" "}
          <Link className="font-medium text-primary-main" to="/login">
            Log in
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default SignupBox;