import { createContext } from "react";
import { ICompanyContext } from "./CompanyProvider";

export const CompanyContext = createContext<ICompanyContext | undefined>(
  undefined,
);
