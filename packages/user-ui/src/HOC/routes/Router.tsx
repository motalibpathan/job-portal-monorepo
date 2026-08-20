import { CompanyDashboardLayout } from "@job-portal/common/src/components/layouts/CompanyDashboardLayout";
import { DashboardLayout } from "@job-portal/common/src/components/layouts/DashboardLayout";
import ApplicationsList from "@job-portal/common/src/components/templates/companyDashboard/ApplicationsList";
import CompanyInfoForm from "@job-portal/common/src/components/templates/companyDashboard/CompanyInfoForm";
import DashboardOverview from "@job-portal/common/src/components/templates/companyDashboard/DashboardOverview";
import JobForm from "@job-portal/common/src/components/templates/companyDashboard/JobForm";
import JobsList from "@job-portal/common/src/components/templates/companyDashboard/JobsList";
import SettingsPage from "@job-portal/common/src/components/templates/companyDashboard/SettingsPage";
import TeamJoinPage from "@job-portal/common/src/components/templates/companyDashboard/TeamJoinPage";
import TeamMembersPage from "@job-portal/common/src/components/templates/companyDashboard/TeamMembersPage";
import CompaniesPage from "@job-portal/common/src/components/templates/companies/CompaniesPage";
import ErrorElement from "@job-portal/common/src/components/templates/errorElement/ErrorElement";
import { PrivateRoute } from "@job-portal/common/src/HOC/routes/PrivateRoute";
import {
  COMPANIES,
  COMPANY_APPLICATIONS,
  COMPANY_DASHBOARD,
  COMPANY_INFO,
  COMPANY_JOB_CREATE,
  COMPANY_JOB_EDIT,
  COMPANY_JOBS,
  COMPANY_SETTINGS,
  COMPANY_TEAM,
  COMPANY_TEAM_JOIN,
  LOGIN,
  ONBOARDING_COMPANY,
  REGISTER,
} from "@job-portal/common/src/HOC/routes/routes";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import CompanySetup from "../../components/templates/company/CompanySetup";
import LoginPage from "../../components/templates/login/LoginPage";
import SignupPage from "../../components/templates/signup/SignupPage";

const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Navigate to={COMPANIES} replace /> : <Navigate to={LOGIN} replace />;
};

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      { path: "/", element: <RootRedirect /> },
      { path: LOGIN, element: <LoginPage /> },
      { path: REGISTER, element: <SignupPage /> },
      {
        path: ONBOARDING_COMPANY,
        element: (
          <PrivateRoute
            component={CompanySetup}
            layout={DashboardLayout}
            layoutProps={{ isCentered: true, maxWidth: 792 }}
          />
        ),
      },
      {
        path: COMPANIES,
        element: (
          <PrivateRoute
            component={CompaniesPage}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_DASHBOARD(":userName"),
        element: (
          <PrivateRoute
            component={DashboardOverview}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_JOBS(":userName"),
        element: (
          <PrivateRoute
            component={JobsList}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_JOB_CREATE(":userName"),
        element: (
          <PrivateRoute
            component={JobForm}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_JOB_EDIT(":userName", ":slug"),
        element: (
          <PrivateRoute
            component={JobForm}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_APPLICATIONS(":userName"),
        element: (
          <PrivateRoute
            component={ApplicationsList}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_INFO(":userName"),
        element: (
          <PrivateRoute
            component={CompanyInfoForm}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_TEAM(":userName"),
        element: (
          <PrivateRoute
            component={TeamMembersPage}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_TEAM_JOIN(":userName"),
        element: (
          <PrivateRoute
            component={TeamJoinPage}
            layout={CompanyDashboardLayout}
          />
        ),
      },
      {
        path: COMPANY_SETTINGS(":userName"),
        element: (
          <PrivateRoute
            component={SettingsPage}
            layout={CompanyDashboardLayout}
          />
        ),
      },
    ],
  },
]);

export { router };
