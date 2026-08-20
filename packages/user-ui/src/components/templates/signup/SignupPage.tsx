import React from "react";
import AuthLayout from "../../organisms/signupOrLogin/AuthLayout";
import SignupBox from "./SignupBox";

const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get started in under a minute"
    >
      <SignupBox />
    </AuthLayout>
  );
};

export default SignupPage;
