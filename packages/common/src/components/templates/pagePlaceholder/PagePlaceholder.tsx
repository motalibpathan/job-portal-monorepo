import React from "react";
import { useLocation } from "react-router-dom";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";

const getPlaceholderTitle = (pathname: string): string => {
  if (pathname.includes("/jobs/create")) return "Create Job";
  if (pathname.includes("/jobs/")) return "Jobs";
  if (pathname.includes("/applications")) return "Applications";
  if (pathname.includes("/dashboard")) return "Dashboard";
  if (pathname.includes("/company")) return "Company";
  if (pathname.includes("/settings")) return "Settings";
  return "Page";
};

const PagePlaceholder: React.FC = () => {
  const { pathname } = useLocation();
  const title = getPlaceholderTitle(pathname);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-borders-light-1 bg-white p-10 text-center">
      <Heading $level={4} className="mb-2">
        {title}
      </Heading>
      <Paragraph $level={2} $typographyPalette="subtitle" className="max-w-md">
        This section is under construction. Check back soon.
      </Paragraph>
    </div>
  );
};

export default PagePlaceholder;
