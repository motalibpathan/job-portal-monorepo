import { Button, Heading, Paragraph } from "@job-portal/common/src";
import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import { useCompanyContext } from "@job-portal/common/src/HOC/contexts/CompanyContext/useCompanyContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, ONBOARDING_COMPANY, REGISTER } from "@job-portal/common/src/HOC/routes/routes";
import { getCompanyPortalUrl } from "../../../utils/companyPortal";

const UserHome: React.FC = () => {
  const { isAuthenticated, user, onLogout } = useAuthContext();
  const { company, setCompany } = useCompanyContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCompany(null);
    onLogout();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-body-2-light-1 p-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-card-2">
        <Heading $level={1} className="mb-2">
          Find Your Next Job
        </Heading>
        <Paragraph $level={2} $typographyPalette="subtitle" className="mb-8">
          Browse thousands of job listings and apply in seconds. Your dream
          career starts here.
        </Paragraph>

        <div className="mb-8 flex gap-4">
          <Button type="filled" color="primary">
            Browse Jobs
          </Button>
          <Button type="outlined" color="primary">
            My Applications
          </Button>
        </div>

        {isAuthenticated && user ? (
          <div className="rounded-xl border border-borders-light-1 p-4">
            <Paragraph $level={4}>
              Logged in as <strong>{user.name || user.email}</strong>
            </Paragraph>
            {company ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Paragraph $level={4} className="!mb-0">
                  Company: <strong>{company.name}</strong>
                </Paragraph>
                <Button
                  type="outlined"
                  color="primary"
                  onClick={() => navigate(getCompanyPortalUrl(company))}
                >
                  Open company portal
                </Button>
              </div>
            ) : (
              <Button
                type="outlined"
                color="primary"
                className="mt-3"
                onClick={() => navigate(ONBOARDING_COMPANY)}
              >
                Set up your company
              </Button>
            )}
            <Button type="text" color="gray" className="mt-3" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button type="filled" color="primary" onClick={() => navigate(LOGIN)}>
              Log in
            </Button>
            <Button type="outlined" color="primary" onClick={() => navigate(REGISTER)}>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
