import { useAuthContext } from "@job-portal/common/src/HOC/contexts/General/AuthContext/useAuthContext";
import React, { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ILayoutProps } from "../../types";
import { LOGIN } from "./routes";

interface IProps {
  layout: ElementType;
  component: ElementType;
  layoutProps?: ILayoutProps;
  componentProps?: Record<string, unknown>;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { pathname } = useLocation();
  const {
    component: Component,
    layout: Layout,
    layoutProps,
    componentProps,
  } = props;
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated === undefined ? null : isAuthenticated ? (
    <Layout {...layoutProps}>
      <Component {...componentProps} />
    </Layout>
  ) : (
    <Navigate
      to={{
        pathname: LOGIN,
        search:
          pathname && pathname !== "/"
            ? `?redirectTo=${pathname}`
            : undefined,
      }}
    />
  );
};

export { PrivateRoute };
