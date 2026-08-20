import { Empty, Pagination, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ICompany, ICompanyListItem } from "../../../api/userApi";
import { getCompaniesApi } from "../../../api/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { toast } from "../../../utils/toast";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import {
  COMPANY_DASHBOARD,
  ONBOARDING_COMPANY,
} from "../../../HOC/routes/routes";

interface ICompaniesPageProps {
  variant?: "user" | "admin";
}

const UserCompanies: React.FC = () => {
  const navigate = useNavigate();
  const { companies, company, setCompany, refreshCompanies, companiesLoading } =
    useCompanyContext();

  useEffect(() => {
    refreshCompanies();
  }, [refreshCompanies]);

  const handleOpenDashboard = (companyDoc: ICompany) => {
    setCompany(companyDoc);
    navigate(COMPANY_DASHBOARD(companyDoc.userName));
  };

  if (companiesLoading && companies.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-borders-light-1 bg-white p-10 text-center">
        <Empty description="You have not set up a company yet" />
        <Button
          type="filled"
          color="primary"
          className="mt-4"
          onClick={() => navigate(ONBOARDING_COMPANY)}
        >
          Set up your company
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Heading $level={3} className="mb-6">
        My Companies
      </Heading>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((companyDoc) => (
          <div
            key={companyDoc._id}
            className="flex flex-col rounded-2xl border border-borders-light-1 bg-white p-6 shadow-card-2"
          >
            <Heading $level={5} className="mb-1 truncate">
              {companyDoc.name}
            </Heading>
            <Paragraph $level={5} $typographyPalette="subtitle" className="mb-4">
              @{companyDoc.userName}
            </Paragraph>
            {companyDoc.description ? (
              <Paragraph
                $level={4}
                $typographyPalette="paragraph"
                className="mb-4 line-clamp-2"
              >
                {companyDoc.description}
              </Paragraph>
            ) : null}
            <div className="mt-auto flex items-center justify-between gap-3">
              {company?._id === companyDoc._id ? (
                <span className="rounded-full bg-primary-light-3 px-3 py-1 text-xs font-medium text-primary-main">
                  Selected
                </span>
              ) : (
                <span />
              )}
              <Button
                type="outlined"
                color="primary"
                onClick={() => handleOpenDashboard(companyDoc)}
              >
                Open Dashboard
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PAGE_SIZE = 20;

const AdminCompanies: React.FC = () => {
  const { onLogout } = useAuthContext();
  const [companies, setCompanies] = useState<ICompanyListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getCompaniesApiAction = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCompaniesApi({ page, limit: PAGE_SIZE });
      setCompanies(res.data.companies);
      setTotal(res.data.total);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load companies");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [page, onLogout]);

  useEffect(() => {
    getCompaniesApiAction();
  }, [getCompaniesApiAction]);

  return (
    <div>
      <Heading $level={3} className="mb-6">
        Companies
      </Heading>

      {loading && companies.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spin size="large" />
        </div>
      ) : null}

      {!loading && companies.length === 0 ? (
        <Empty description="No companies found" className="py-16" />
      ) : null}

      {companies.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((companyDoc) => {
              const creator =
                typeof companyDoc.creatorUserId === "object"
                  ? companyDoc.creatorUserId
                  : undefined;
              return (
                <div
                  key={companyDoc._id}
                  className="flex flex-col rounded-2xl border border-borders-light-1 bg-white p-6 shadow-card-2"
                >
                  <Heading $level={5} className="mb-1 truncate">
                    {companyDoc.name}
                  </Heading>
                  <Paragraph
                    $level={5}
                    $typographyPalette="subtitle"
                    className="mb-4"
                  >
                    @{companyDoc.userName}
                  </Paragraph>
                  {creator ? (
                    <Paragraph $level={5} $typographyPalette="subtitle">
                      Created by {creator.name || creator.email}
                    </Paragraph>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              pageSize={PAGE_SIZE}
              total={total}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

const CompaniesPage: React.FC<ICompaniesPageProps> = ({ variant = "user" }) => {
  return variant === "admin" ? <AdminCompanies /> : <UserCompanies />;
};

export default CompaniesPage;
