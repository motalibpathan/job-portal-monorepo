import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  EMAIL_FORMAT_REGEX,
  Paragraph,
  TextFieldForm,
  userGoogleLoginApi,
  userLoginApi,
  userLoginCheckApi,
} from "@job-portal/common/src";
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
import type { ICompany, IGoogleLoginPayload, IUser } from "../../../types/auth";
import GoogleLoginButton from "../../google/GoogleLoginButton";
import OtpView from "../../organisms/signupOrLogin/OtpView";
import PasswordView from "./PasswordView";

type TLoginStep = "login" | "password" | "otp";

const LoginBox: React.FC = () => {
  const navigate = useNavigate();
  const { loginUserOnCredentialsAction } = useAuthContext();
  const { refreshCompanies } = useCompanyContext();

  const [step, setStep] = useState<TLoginStep>("login");
  const [loginInput, setLoginInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const finishLogin = async (
    accessToken: string,
    refreshToken: string,
    user: IUser,
  ) => {
    loginUserOnCredentialsAction({ accessToken, refreshToken, user });
    const companies = await refreshCompanies();
    redirect(companies);
  };

  const userGoogleLoginApiAction = async (payload: IGoogleLoginPayload) => {
    setAuthErrorMessage("");
    setAuthLoading(true);
    try {
      const res = await userGoogleLoginApi(payload);
      await finishLogin(res.data.accessToken, res.data.refreshToken, res.data.user);
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      setAuthErrorMessage(data?.message || error || "Google login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const userLoginCheckApiAction = async () => {
    setAuthErrorMessage("");
    if (!loginInput.trim()) {
      setAuthErrorMessage("Please enter your email");
      return;
    }
    if (!EMAIL_FORMAT_REGEX.test(loginInput.trim())) {
      setAuthErrorMessage("Email is not valid");
      return;
    }
    setAuthLoading(true);
    try {
      const res = await userLoginCheckApi({ email: loginInput.trim() });
      setStep(res.data.command === "verify" ? "otp" : "password");
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      setAuthErrorMessage(
        data?.message || error || "We could not find an account with this email",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const userLoginApiPasswordAction = async (password: string) => {
    setAuthLoading(true);
    try {
      const res = await userLoginApi({
        email: loginInput.trim(),
        password,
      });
      await finishLogin(res.data.accessToken, res.data.refreshToken, res.data.user);
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      setAuthErrorMessage(data?.message || error || "Invalid email or password");
    } finally {
      setAuthLoading(false);
    }
  };

  const userLoginApiOtpAction = async (otp: string, newPassword: string) => {
    setAuthLoading(true);
    try {
      const res = await userLoginApi({
        email: loginInput.trim(),
        password: newPassword,
        otp,
      });
      await finishLogin(res.data.accessToken, res.data.refreshToken, res.data.user);
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      setAuthErrorMessage(data?.message || error || "OTP verification failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const resendOtpApiAction = async () => {
    try {
      await userLoginCheckApi({ email: loginInput.trim() });
    } catch (err) {
      const { error, data } = handlePublicApiError(err as ICommonApiError);
      setAuthErrorMessage(data?.message || error || "Failed to resend OTP");
    }
  };

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

  const goBack = () => {
    setAuthErrorMessage("");
    setStep("login");
  };

  return step === "login" ? (
    <>
      <TextFieldForm
        labelText="Email"
        name="email"
        required
        type="email"
        placeholder="you@company.com"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        onPressEnter={userLoginCheckApiAction}
        errorMessage={authErrorMessage}
      />
      <div className={"h-4"} />
      <Button
        type="filled"
        color="primary"
        className="w-full"
        size="large"
        loading={authLoading}
        loadingText="Checking..."
        onClick={userLoginCheckApiAction}
      >
        Continue
      </Button>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-borders-light-1" />
        <Paragraph $level={5} $typographyPalette="subtitle">
          or
        </Paragraph>
        <span className="h-px flex-1 bg-borders-light-1" />
      </div>

      <GoogleLoginButton onCredential={userGoogleLoginApiAction} />

      <div className="text-center">
        <Paragraph $level={5}>
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-primary-main" to="/register">
            Register
          </Link>
        </Paragraph>
      </div>
    </>
  ) : step === "password" ? (
    <PasswordView
      email={loginInput.trim()}
      authLoading={authLoading}
      authErrorMessage={authErrorMessage}
      setAuthErrorMessage={setAuthErrorMessage}
      onSubmit={userLoginApiPasswordAction}
      onChangeEmail={goBack}
    />
  ) : (
    <OtpView
      email={loginInput.trim()}
      authLoading={authLoading}
      authErrorMessage={authErrorMessage}
      setAuthErrorMessage={setAuthErrorMessage}
      onVerify={userLoginApiOtpAction}
      onResend={resendOtpApiAction}
      onChangeEmail={goBack}
    />
  );
};

export default LoginBox;
