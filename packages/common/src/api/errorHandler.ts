import { AxiosError } from "axios";

// ─── Error types ─────────────────────────────────────────────────────────────

export type IErrorApi = AxiosError;

export type ICommonApiError = AxiosError<{
  message?: string;
}>;

export type IAuthApiError = ICommonApiError &
  AxiosError<{
    email?: string;
    password?: string;
    username?: string;
  }>;

// ─── Internal helpers ─────────────────────────────────────────────────────────

interface IErrorData<E> {
  status: number;
  error: string;
  data?: E;
}

const getWaitingTimeInMinutes = (err: AxiosError<any>): string => {
  try {
    const retryAfter = err.response?.headers["retry-after"];
    if (!retryAfter) return "some time";

    const retryAfterNumber = parseInt(retryAfter);
    if (isNaN(retryAfterNumber) || !retryAfterNumber) return "some time";

    let minutes = Math.ceil(retryAfterNumber / 60);
    let hours = 0;

    if (minutes > 60) {
      hours = Math.ceil(minutes / 60);
      minutes = Math.ceil(minutes % 60);
    }

    return `${hours > 0 ? `${hours} hours ` : ""}${minutes > 0 ? `${minutes} minutes` : ""}`;
  } catch {
    return "some time";
  }
};

// ─── Handlers ─────────────────────────────────────────────────────────────────

/**
 * Handle errors from private (authenticated) API calls.
 * Pass a `logoutAction` callback that will be invoked on 401.
 */
export function handlePrivateApiError<E>(
  err: AxiosError<E>,
  logoutAction: () => void,
): IErrorData<E> {
  if (err && err.response && err.response.status) {
    switch (err.response.status) {
      case 400:
        return { status: 400, error: "", data: err.response.data };
      case 401:
        logoutAction();
        return {
          status: 401,
          error: "Your session has expired. Please log in again.",
          data: err.response.data,
        };
      case 402:
        return { status: 402, error: "Payment required", data: err.response.data };
      case 403:
        return { status: 403, error: "You do not have permission to perform this action.", data: err.response.data };
      case 404:
        return { status: 404, error: "Resource not found.", data: err.response.data };
      case 429: {
        const retryInMinutes = getWaitingTimeInMinutes(err);
        return {
          status: 429,
          error: `Too many requests. Please try again after ${retryInMinutes || "some time"}.`,
          data: err.response.data,
        };
      }
      case 500:
        return { status: 500, error: "An internal server error occurred.", data: err.response.data };
      default:
        return { status: 520, error: "Something went wrong!" };
    }
  }
  return { status: 520, error: "Something went wrong!" };
}

/**
 * Handle errors from public (unauthenticated) API calls.
 */
export function handlePublicApiError<E>(err: AxiosError<E>): IErrorData<E> {
  if (err && err.response && err.response.status) {
    switch (err.response.status) {
      case 400:
        return { status: 400, error: "", data: err.response.data };
      case 401:
        return { status: 401, error: "Unauthorized.", data: err.response.data };
      case 403:
        return { status: 403, error: "Forbidden.", data: err.response.data };
      case 404:
        return { status: 404, error: "Resource not found.", data: err.response.data };
      case 429: {
        const retryInMinutes = getWaitingTimeInMinutes(err);
        return {
          status: 429,
          error: `Too many requests. Please try again after ${retryInMinutes || "some time"}.`,
          data: err.response.data,
        };
      }
      case 500:
        return { status: 500, error: "An internal server error occurred.", data: err.response.data };
      default:
        return {
          status: err?.response?.status || 520,
          error: "Something went wrong!",
        };
    }
  }
  return { status: 520, error: "Something went wrong!" };
}

/**
 * Handle errors for APIs that use blob response type.
 */
export function handleBlobTypeError(
  err: AxiosError,
  reject: (reason: any) => void,
) {
  if (err?.response?.data instanceof Blob) {
    err.response.data
      .text()
      .then((text: string) => {
        try {
          const errorData = JSON.parse(text);
          reject({ ...err, response: { ...err.response, data: errorData } });
        } catch {
          reject(err);
        }
      })
      .catch(() => reject(err));
  } else {
    reject(err);
  }
}
