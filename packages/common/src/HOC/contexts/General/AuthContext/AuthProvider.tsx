import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { clearAuthorizationApi, setAuthorizationApi } from "../../../../api";
import type { IUser } from "../../../../api/userApi";
import {
  getUserAndTokenLocal,
  removeDataOnLogoutLocal,
  setUserAndTokensLocal,
} from "../../../../utils/localstorage";
import { AuthContext } from "./AuthContext";

export interface IAuthContext {
  user?: IUser;
  isAuthenticated?: boolean;
  authLoading?: boolean;
  authErrorMessage: string;
  setAuthErrorMessage: (error: string) => void;
  setAuthLoading: (loading: boolean) => void;
  loginUserOnCredentialsAction: (data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  onLogout: () => void;
}

let authInitialState: { user?: IUser } = {};

const localUserAndToken = getUserAndTokenLocal();
if (localUserAndToken) {
  setAuthorizationApi(localUserAndToken.authAccessToken);
  authInitialState = { user: localUserAndToken.user };
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(authInitialState.user);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [authLoading, setAuthLoading] = useState<boolean | undefined>(false);

  const loginUserOnCredentialsAction = useCallback(
    (data: { user: IUser; accessToken: string; refreshToken: string }) => {
      setUserAndTokensLocal(data.user, data.accessToken, data.refreshToken);
      setAuthorizationApi(data.accessToken);
      setUser(data.user);
      setAuthLoading(false);
    },
    [],
  );

  const onLogout = useCallback(() => {
    removeDataOnLogoutLocal();
    clearAuthorizationApi();
    setUser(undefined);
    setAuthLoading(false);
  }, []);

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authLoading,
      authErrorMessage,
      setAuthErrorMessage,
      setAuthLoading,
      loginUserOnCredentialsAction,
      onLogout,
    }),
    [user, authLoading, authErrorMessage],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
