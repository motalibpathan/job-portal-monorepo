import React, { useState } from "react";
import {
  Button,
  Paragraph,
  PasswordFieldForm,
} from "@job-portal/common/src";

const MIN_PASSWORD_LENGTH = 8;

interface IPasswordViewProps {
  email: string;
  authLoading?: boolean;
  authErrorMessage?: string;
  setAuthErrorMessage: (message: string) => void;
  onSubmit: (password: string) => Promise<void>;
  onChangeEmail: () => void;
}

const PasswordView: React.FC<IPasswordViewProps> = ({
  email,
  authLoading,
  authErrorMessage,
  setAuthErrorMessage,
  onSubmit,
  onChangeEmail,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setAuthErrorMessage("");
    if (!password) {
      setAuthErrorMessage("Please enter the password");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setAuthErrorMessage("Password must contain at least 8 characters");
      return;
    }
    try {
      await onSubmit(password);
    } catch {
      //
    }
  };

  return (
    <>
      <Paragraph $level={4}>
        {email}
        <button
          type="button"
          className="text-primary-main cursor-pointer border-none bg-transparent p-0"
          onClick={onChangeEmail}
        >
          Change
        </button>
      </Paragraph>

      <PasswordFieldForm
        labelText="Password"
        name="password"
        required
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onPressEnter={handleSubmit}
        errorMessage={authErrorMessage}
      />
      <div className={"h-4"} />
      <Button
        type="filled"
        color="primary"
        className="w-full"
        size="large"
        loading={authLoading}
        loadingText="Logging in..."
        onClick={handleSubmit}
      >
        Log in
      </Button>

      <Button type="text" color="primary" onClick={onChangeEmail}>
        &larr; Use a different email
      </Button>
    </>
  );
};

export default PasswordView;
