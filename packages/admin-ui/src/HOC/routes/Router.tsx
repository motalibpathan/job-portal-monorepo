import { DashboardLayout } from "@job-portal/common/src/components/layouts/DashboardLayout";
import CompaniesPage from "@job-portal/common/src/components/templates/companies/CompaniesPage";
import ErrorElement from "@job-portal/common/src/components/templates/errorElement/ErrorElement";
import { PrivateRoute } from "@job-portal/common/src/HOC/routes/PrivateRoute";
import { COMPANIES, HOME } from "@job-portal/common/src/HOC/routes/routes";
import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../../components/templates/home/AdminHome";

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        path: HOME,
        element: (
          <PrivateRoute
            component={AdminHome}
            layout={DashboardLayout}
            layoutProps={{ isDarkBackground: true }}
          />
        ),
      },
      {
        path: COMPANIES,
        element: (
          <PrivateRoute
            component={CompaniesPage}
            layout={DashboardLayout}
            layoutProps={{ isDarkBackground: true }}
            componentProps={{ variant: "admin" }}
          />
        ),
      },
    ],
  },
]);

export { router };
