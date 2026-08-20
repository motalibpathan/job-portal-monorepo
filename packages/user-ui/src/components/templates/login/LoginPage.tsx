import React from "react";
import AuthLayout from "../../organisms/signupOrLogin/AuthLayout";
import LoginBox from "./LoginBox";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your account to manage your company"
    >
      <LoginBox />
    </AuthLayout>
  );
};

export default LoginPage;
