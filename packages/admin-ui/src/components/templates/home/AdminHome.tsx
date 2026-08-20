import { Button, Heading, Paragraph } from "@job-portal/common/src";
import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import React from "react";

const AdminHome: React.FC = () => {
  const { isAuthenticated, user, onLogout } = useAuthContext();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-body-1-dark-2 p-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-card-2">
        <Heading $level={1} className="mb-2">
          Admin Dashboard
        </Heading>
        <Paragraph $level={2} $typographyPalette="subtitle" className="mb-8">
          Welcome to the Job Portal Admin Portal. Manage jobs, companies, and
          applications from here.
        </Paragraph>

        {isAuthenticated && user ? (
          <Paragraph $level={4} className="mb-4">
            Logged in as <strong>{user.name || user.email}</strong>
          </Paragraph>
        ) : null}

        <div className="flex gap-4">
          <Button type="filled" color="primary">
            Manage Jobs
          </Button>
          <Button type="outlined" color="primary">
            View Applications
          </Button>
          <Button type="text" color="danger" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
