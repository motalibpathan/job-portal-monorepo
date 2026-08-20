import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ICompany } from "../../../api/userApi";
import { getMyCompaniesApi } from "../../../api/userApi";
import { useAuthContext } from "../General/AuthContext/useAuthContext";
import {
  getCompanyLocal,
  removeCompanyLocal,
  setCompanyLocal,
} from "../../../utils/localstorage";
import { CompanyContext } from "./CompanyContext";

export interface ICompanyContext {
  companies: ICompany[];
  company: ICompany | null;
  setCompany: (company: ICompany | null) => void;
  refreshCompanies: () => Promise<ICompany[]>;
  companiesLoading: boolean;
}

const companyInitialState = getCompanyLocal();

export const CompanyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [company, setCompanyState] = useState<ICompany | null>(
    companyInitialState,
  );
  const [companiesLoading, setCompaniesLoading] = useState(false);

  const setCompany = useCallback((companyDoc: ICompany | null) => {
    if (companyDoc) {
      setCompanyLocal(companyDoc);
    } else {
      removeCompanyLocal();
    }
    setCompanyState(companyDoc);
  }, []);

  const refreshCompanies = useCallback(async (): Promise<ICompany[]> => {
    setCompaniesLoading(true);
    try {
      const res = await getMyCompaniesApi();
      const fetchedCompanies = res.data || [];
      setCompanies(fetchedCompanies);

      setCompanyState((current) => {
        if (current && !fetchedCompanies.some((c) => c._id === current._id)) {
          removeCompanyLocal();
          return null;
        }
        if (!current && fetchedCompanies.length === 1) {
          setCompanyLocal(fetchedCompanies[0]);
          return fetchedCompanies[0];
        }
        return current;
      });

      return fetchedCompanies;
    } catch {
      setCompanies([]);
      return [];
    } finally {
      setCompaniesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshCompanies();
    } else {
      setCompanies([]);
      setCompany(null);
    }
  }, [isAuthenticated, refreshCompanies, setCompany]);

  const value = useMemo<ICompanyContext>(
    () => ({
      companies,
      company,
      setCompany,
      refreshCompanies,
      companiesLoading,
    }),
    [companies, company, setCompany, refreshCompanies, companiesLoading],
  );

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
