import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  getUserAndTokenLocal,
  removeDataOnLogoutLocal,
  setTokensLocal,
} from "../utils/localstorage";

const REFRESH_TOKEN_URL = `${BASE_URL}/api/token/refresh`;

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * The server returns tokens prefixed with "JWT " (e.g. "JWT eyJ...") but the
 * Authorization header must be `Bearer <token>` without the prefix. Strip it
 * everywhere so tokens can be stored and sent in one canonical shape.
 */
function stripTokenPrefix(token?: string | null): string {
  if (!token) return "";
  return token.replace(/^JWT\s+/i, "");
}

function getTokens(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  const localUserAndToken = getUserAndTokenLocal();
  if (!localUserAndToken) return { accessToken: null, refreshToken: null };
  return {
    accessToken: stripTokenPrefix(localUserAndToken.authAccessToken),
    refreshToken: stripTokenPrefix(localUserAndToken.authRefreshToken),
  };
}

function saveTokens(accessToken: string, refreshToken: string): void {
  setTokensLocal(accessToken, refreshToken);
}

function clearAuth(): void {
  removeDataOnLogoutLocal();
}

// ─── Instances ───────────────────────────────────────────────────────────────

const publicInstance = axios.create();
const privateInstance = axios.create();

/** Call this after login to attach the bearer token to all private requests. */
export function setAuthorizationApi(token: string): void {
  const cleanToken = stripTokenPrefix(token);
  if (cleanToken) {
    privateInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cleanToken}`;
  }
}

/** Remove authorization header (e.g. on logout). */
export function clearAuthorizationApi(): void {
  delete privateInstance.defaults.headers.common["Authorization"];
}

// ─── Request interceptor – attach latest token on every request ──────────────

privateInstance.interceptors.request.use((config) => {
  const { accessToken } = getTokens();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// ─── Response interceptor – token refresh on 401 ────────────────────────────

privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.config?._retry && error.response?.status === 401) {
      error.config._retry = true;

      const { refreshToken } = getTokens();
      if (refreshToken) {
        try {
          const res = await publicInstance.post<{
            accessToken: string;
            refreshToken: string;
          }>(REFRESH_TOKEN_URL, { token: `JWT ${refreshToken}` });

          const { accessToken, refreshToken: newRefresh } = res.data;
          saveTokens(accessToken, newRefresh);
          setAuthorizationApi(accessToken);
          error.config.headers[
            "Authorization"
          ] = `Bearer ${stripTokenPrefix(accessToken)}`;

          return axios(error.config);
        } catch {
          clearAuth();
          clearAuthorizationApi();
          return Promise.reject(error);
        }
      } else {
        clearAuth();
        clearAuthorizationApi();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const publicApiRequest = publicInstance;
export const privateApiRequest = privateInstance;
