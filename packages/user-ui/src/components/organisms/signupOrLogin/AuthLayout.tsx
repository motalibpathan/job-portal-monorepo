import React, { PropsWithChildren } from "react";
import { Heading, Paragraph } from "@job-portal/common/src";

interface IAuthLayoutProps {
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<PropsWithChildren<IAuthLayoutProps>> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-body-2-light-1 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card-2">
        <div className="mb-6 text-center">
          <Heading $level={3} className="mb-1">
            {title}
          </Heading>
          {subtitle ? (
            <Paragraph $level={3} $typographyPalette="subtitle">
              {subtitle}
            </Paragraph>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
