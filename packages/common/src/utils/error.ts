import axios, { AxiosError } from "axios";

export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<{ message?: string }>;
    return axiosErr.response?.data?.message || axiosErr.message || fallback;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
