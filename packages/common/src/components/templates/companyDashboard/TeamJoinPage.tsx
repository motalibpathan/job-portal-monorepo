import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Result, Spin } from "antd";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { joinTeamApi } from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { COMPANY_DASHBOARD } from "../../../HOC/routes/routes";

const TeamJoinPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshCompanies } = useCompanyContext();
  const { onLogout } = useAuthContext();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token || !userName) {
      setStatus("error");
      setErrorMessage("Invalid invite link");
      return;
    }

    const joinTeamApiAction = async () => {
      try {
        await joinTeamApi(userName, token);
        await refreshCompanies();
        setStatus("success");
        setTimeout(() => {
          navigate(COMPANY_DASHBOARD(userName), { replace: true });
        }, 2000);
      } catch (err) {
        const { error, data } = handlePrivateApiError(
          err as ICommonApiError,
          onLogout,
        );
        setStatus("error");
        setErrorMessage(data?.message || error || "Failed to join team");
      }
    };

    joinTeamApiAction();
  }, [userName, searchParams, navigate, refreshCompanies, onLogout]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Result status="error" title="Could not join team" subTitle={errorMessage} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Result
        status="success"
        title="Welcome to the team!"
        subTitle="Redirecting to company dashboard..."
      />
    </div>
  );
};

export default TeamJoinPage;
