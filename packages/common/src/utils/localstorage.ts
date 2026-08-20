import type { ICompany, IUser } from "../api/userApi";

interface ILocalstorageKeys {
  authAccessToken: string;
  authRefreshToken: string;
  user: string;
  company: string;
}

export const LOCALSTORAGE_KEYS: ILocalstorageKeys = {
  authAccessToken: "jobPortal.app.authAccessToken",
  authRefreshToken: "jobPortal.app.authRefreshToken",
  user: "jobPortal.app.user",
  company: "jobPortal.app.company",
};

export const getUserAndTokenLocal = (): {
  authAccessToken: string;
  authRefreshToken: string;
  user: IUser;
} | null => {
  try {
    const user = localStorage.getItem(LOCALSTORAGE_KEYS.user);
    const authAccessToken = localStorage.getItem(
      LOCALSTORAGE_KEYS.authAccessToken,
    );
    const authRefreshToken = localStorage.getItem(
      LOCALSTORAGE_KEYS.authRefreshToken,
    );
    if (user && authAccessToken && authRefreshToken) {
      return {
        authAccessToken,
        authRefreshToken,
        user: JSON.parse(user) as IUser,
      };
    }
    return null;
  } catch {
    return null;
  }
};

export const setUserAndTokensLocal = (
  user: IUser,
  accessToken: string,
  refreshToken: string,
) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEYS.authAccessToken, accessToken);
    localStorage.setItem(LOCALSTORAGE_KEYS.authRefreshToken, refreshToken);
    localStorage.setItem(LOCALSTORAGE_KEYS.user, JSON.stringify(user));
  } catch {
    //
  }
};

export const setTokensLocal = (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEYS.authAccessToken, accessToken);
    localStorage.setItem(LOCALSTORAGE_KEYS.authRefreshToken, refreshToken);
  } catch {
    //
  }
};

export const removeDataOnLogoutLocal = () => {
  try {
    localStorage.removeItem(LOCALSTORAGE_KEYS.authAccessToken);
    localStorage.removeItem(LOCALSTORAGE_KEYS.authRefreshToken);
    localStorage.removeItem(LOCALSTORAGE_KEYS.user);
  } catch {
    //
  }
};

export const getCompanyLocal = (): ICompany | null => {
  try {
    const company = localStorage.getItem(LOCALSTORAGE_KEYS.company);
    return company ? (JSON.parse(company) as ICompany) : null;
  } catch {
    return null;
  }
};

export const setCompanyLocal = (company: ICompany) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEYS.company, JSON.stringify(company));
  } catch {
    //
  }
};

export const removeCompanyLocal = () => {
  try {
    localStorage.removeItem(LOCALSTORAGE_KEYS.company);
  } catch {
    //
  }
};
