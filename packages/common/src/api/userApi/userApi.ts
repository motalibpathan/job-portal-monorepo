import { AxiosResponse } from "axios";
import { BASE_URL } from "../../utils/config";
import { privateApiRequest, publicApiRequest } from "../apiRequest";
import {
  IAuthResponse,
  IBillingSubscriptionResponse,
  IBillingTransactionsResponse,
  ICompany,
  ICompanyStats,
  ICreateCompanyPayload,
  ICreateJobPayload,
  IGetCompaniesResponse,
  IGoogleLoginPayload,
  IJob,
  IJobApplication,
  IJobCategory,
  ILoginCheckResponse,
  IRegisterWithCompanyPayload,
  ITeamInviteResponse,
  ITeamMembersResponse,
  IUsernameCheckResponse,
} from "./types";

// login

export function userLoginApi(data: {
  email: string;
  password: string;
  otp?: string;
}) {
  return new Promise<AxiosResponse<IAuthResponse>>((resolve, reject) => {
    publicApiRequest
      .post(`${BASE_URL}/api/login`, data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function userLoginCheckApi(data: { email: string }) {
  return new Promise<AxiosResponse<ILoginCheckResponse>>((resolve, reject) => {
    publicApiRequest
      .post(`${BASE_URL}/api/login/check`, data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// social login

export function userGoogleLoginApi(data: IGoogleLoginPayload) {
  return new Promise<AxiosResponse<IAuthResponse>>((resolve, reject) => {
    publicApiRequest
      .post(`${BASE_URL}/api/google/login`, data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// signup

export function registerWithCompanyApi(data: IRegisterWithCompanyPayload) {
  return new Promise<AxiosResponse<IAuthResponse>>((resolve, reject) => {
    publicApiRequest
      .post(`${BASE_URL}/api/signup-with-company`, data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function userSignupApi(data: {
  name: string;
  email: string;
  password: string;
}) {
  return new Promise<AxiosResponse<IAuthResponse>>((resolve, reject) => {
    publicApiRequest
      .post(`${BASE_URL}/api/signup`, data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// company

export function createCompanyApi(data: ICreateCompanyPayload) {
  return new Promise<AxiosResponse<ICompany>>((resolve, reject) => {
    privateApiRequest
      .post(`${BASE_URL}/api/companies`, {
        ...data,
        userName: data.userName || undefined,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getMyCompanyApi() {
  return new Promise<AxiosResponse<ICompany>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/companies/me`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getMyCompaniesApi() {
  return new Promise<AxiosResponse<ICompany[]>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/companies/mine`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCompaniesApi(data?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return new Promise<AxiosResponse<IGetCompaniesResponse>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/companies`, { params: data })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function checkCompanyUsernameApi(username: string) {
  return new Promise<AxiosResponse<IUsernameCheckResponse>>((resolve, reject) => {
    publicApiRequest
      .get(`${BASE_URL}/api/companies/username/check`, {
        params: { username },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateCompanyApi(
  userName: string,
  data: Partial<ICreateCompanyPayload>,
) {
  return new Promise<AxiosResponse<ICompany>>((resolve, reject) => {
    privateApiRequest
      .put(`${BASE_URL}/api/companies/${userName}`, data)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function deleteCompanyApi(userName: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    privateApiRequest
      .delete(`${BASE_URL}/api/companies/${userName}`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Job Categories (per-company) ────────────────────────────────────────────

export function getJobCategoriesApi(userName: string) {
  return new Promise<AxiosResponse<IJobCategory[]>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/companies/${userName}/job-categories`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function createJobCategoryApi(
  userName: string,
  data: { name: string; companyId: string },
) {
  return new Promise<AxiosResponse<IJobCategory>>((resolve, reject) => {
    privateApiRequest
      .post(`${BASE_URL}/api/companies/${userName}/job-categories`, data)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function updateJobCategoryApi(
  categoryId: string,
  data: { name: string },
) {
  return new Promise<AxiosResponse<IJobCategory>>((resolve, reject) => {
    privateApiRequest
      .put(`${BASE_URL}/api/job-categories/${categoryId}`, data)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function deleteJobCategoryApi(categoryId: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    privateApiRequest
      .delete(`${BASE_URL}/api/job-categories/${categoryId}`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export function getCompanyJobsApi(userName: string) {
  return new Promise<AxiosResponse<IJob[]>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/${userName}/jobs`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function getCompanyJobApi(userName: string, jobId: string) {
  return new Promise<AxiosResponse<IJob>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/${userName}/jobs/${jobId}`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function createCompanyJobApi(
  userName: string,
  data: ICreateJobPayload,
) {
  return new Promise<AxiosResponse<IJob>>((resolve, reject) => {
    privateApiRequest
      .post(`${BASE_URL}/api/${userName}/jobs`, data)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function updateCompanyJobApi(
  userName: string,
  jobId: string,
  data: Partial<ICreateJobPayload & { applicationForm: IJob["applicationForm"]; stages: IJob["stages"] }>,
) {
  return new Promise<AxiosResponse<IJob>>((resolve, reject) => {
    privateApiRequest
      .put(`${BASE_URL}/api/${userName}/jobs/${jobId}`, data)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function deleteCompanyJobApi(userName: string, jobId: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    privateApiRequest
      .delete(`${BASE_URL}/api/${userName}/jobs/${jobId}`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Applications ────────────────────────────────────────────────────────────

export function getJobApplicationsApi(userName: string, jobId: string) {
  return new Promise<AxiosResponse<IJobApplication[]>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/${userName}/jobs/${jobId}/applications`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function updateApplicationStatusApi(
  userName: string,
  jobId: string,
  applicationId: string,
  status: string,
) {
  return new Promise<AxiosResponse<IJobApplication>>((resolve, reject) => {
    privateApiRequest
      .patch(
        `${BASE_URL}/api/${userName}/jobs/${jobId}/applications/${applicationId}/status`,
        { status },
      )
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getCompanyStatsApi(userName: string) {
  return new Promise<AxiosResponse<ICompanyStats>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/${userName}/stats`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Team Members ───────────────────────────────────────────────────────────

export function getCompanyTeamApi(userName: string) {
  return new Promise<AxiosResponse<ITeamMembersResponse>>((resolve, reject) => {
    privateApiRequest
      .get(`${BASE_URL}/api/companies/${userName}/team`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function generateTeamInviteApi(userName: string) {
  return new Promise<AxiosResponse<ITeamInviteResponse>>((resolve, reject) => {
    privateApiRequest
      .post(`${BASE_URL}/api/companies/${userName}/team/invite`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function joinTeamApi(userName: string, token: string) {
  return new Promise<AxiosResponse<{ message: string }>>((resolve, reject) => {
    privateApiRequest
      .post(`${BASE_URL}/api/companies/${userName}/team/join`, { token })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

// ─── Billing ─────────────────────────────────────────────────────────────────

export function getBillingSubscriptionApi(userName: string) {
  return new Promise<AxiosResponse<IBillingSubscriptionResponse>>(
    (resolve, reject) => {
      privateApiRequest
        .get(`${BASE_URL}/api/${userName}/billing/subscription`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    },
  );
}

export function getBillingTransactionsApi(userName: string) {
  return new Promise<AxiosResponse<IBillingTransactionsResponse>>(
    (resolve, reject) => {
      privateApiRequest
        .get(`${BASE_URL}/api/${userName}/billing/transactions`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    },
  );
}
