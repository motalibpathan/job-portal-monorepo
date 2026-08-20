import React, { useEffect, useState } from "react";
import {
  Button,
  Paragraph,
  PasswordFieldForm,
  TextFieldForm,
  zodSchemaWrapper,
  otpSchema,
} from "@job-portal/common/src";

const OTP_LENGTH = 4;
const RESEND_COUNTDOWN_SECONDS = 180;

interface IOtpViewProps {
  email: string;
  authLoading?: boolean;
  authErrorMessage?: string;
  setAuthErrorMessage: (message: string) => void;
  onVerify: (otp: string, newPassword: string) => Promise<void>;
  onResend: () => Promise<void>;
  onChangeEmail: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const OtpView: React.FC<IOtpViewProps> = ({
  email,
  authLoading,
  authErrorMessage,
  setAuthErrorMessage,
  onVerify,
  onResend,
  onChangeEmail,
}) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [otpSubmitLoading, setOtpSubmitLoading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const validate = zodSchemaWrapper(otpSchema);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
  }, [countdown]);

  const handleSubmit = async () => {
    setAuthErrorMessage("");
    const result = validate({ otp: otp.trim(), newPassword });
    if (!result.isValid) {
      setAuthErrorMessage(result.message ?? "Validation failed");
      return;
    }

    setOtpSubmitLoading(true);
    try {
      await onVerify(otp.trim(), newPassword);
    } catch {
      //
    } finally {
      setOtpSubmitLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setAuthErrorMessage("");
    setResendOtpLoading(true);
    try {
      await onResend();
    } catch {
      //
    } finally {
      setOtp("");
      setResendOtpLoading(false);
      setCanResend(false);
      setCountdown(RESEND_COUNTDOWN_SECONDS);
    }
  };

  return (
    <>
      <Paragraph $level={4}>
        An OTP was sent to your email. Enter it below along with a new password
        to complete login.{" "}
        <button
          type="button"
          className="text-primary-main cursor-pointer border-none bg-transparent p-0"
          onClick={onChangeEmail}
        >
          Change
        </button>
      </Paragraph>

      <TextFieldForm
        labelText="Email"
        name="email"
        type="email"
        value={email}
        disabled
      />

      <TextFieldForm
        labelText="OTP"
        name="otp"
        required
        placeholder={`${OTP_LENGTH}-digit OTP`}
        maxLength={OTP_LENGTH}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        errorMessage={authErrorMessage}
      />

      <PasswordFieldForm
        labelText="New Password"
        name="newPassword"
        required
        placeholder="At least 8 characters"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onPressEnter={handleSubmit}
      />

      <Button
        type="filled"
        color="primary"
        className="w-full"
        size="large"
        loading={authLoading || otpSubmitLoading}
        loadingText="Verifying..."
        onClick={handleSubmit}
      >
        Verify &amp; Log in
      </Button>

      <div className="flex items-center gap-2">
        <Paragraph $level={5}>Didn&apos;t receive the OTP?</Paragraph>
        {canResend ? (
          <Button
            type="text"
            color="primary"
            size="small"
            className="h-fit p-0"
            loading={resendOtpLoading}
            disabled={authLoading}
            onClick={handleResend}
          >
            Resend
          </Button>
        ) : (
          <Paragraph $level={5} className="!mb-0 text-primary-main">
            Resend in {formatTime(countdown)}
          </Paragraph>
        )}
      </div>

      <Button type="text" color="primary" onClick={onChangeEmail}>
        &larr; Use a different email
      </Button>
    </>
  );
};

export default OtpView;
