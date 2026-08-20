import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { SelectForm } from "../../molecules/selects";
import {
  getCompanyJobsApi,
  getJobApplicationsApi,
  updateApplicationStatusApi,
} from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { toast } from "../../../utils/toast";
import type {
  IJob,
  IJobApplication,
  TJobApplicationStatus,
} from "../../../api/userApi/types";
import {
  jobApplicationStatuses,
  JOB_APPLICATION_STATUS_TEXT_MAP,
  JOB_APPLICATION_STATUS_COLOR_MAP,
} from "../../../api/userApi/types";

const STATUS_OPTIONS: { value: TJobApplicationStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  ...jobApplicationStatuses.map((value) => ({
    value,
    label: JOB_APPLICATION_STATUS_TEXT_MAP[value],
  })),
];

const statusColors: Record<string, string> = { ...JOB_APPLICATION_STATUS_COLOR_MAP };

const ApplicationsList: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const { onLogout } = useAuthContext();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [applications, setApplications] = useState<IJobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selectedJobId, setSelectedJobId] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getCompanyJobsApiAction = useCallback(async () => {
    if (!userName) return;
    try {
      const resp = await getCompanyJobsApi(userName);
      setJobs(resp.data);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load jobs");
    }
  }, [userName, onLogout]);

  const getJobApplicationsApiAction = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      if (selectedJobId === "all") {
        const allApps: IJobApplication[] = [];
        for (const job of jobs) {
          try {
            const resp = await getJobApplicationsApi(userName, job._id);
            allApps.push(...resp.data);
          } catch {
            // skip failed job
          }
        }
        setApplications(allApps);
      } else {
        const resp = await getJobApplicationsApi(userName, selectedJobId);
        setApplications(resp.data);
      }
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [userName, selectedJobId, jobs, onLogout]);

  useEffect(() => {
    getCompanyJobsApiAction();
  }, [getCompanyJobsApiAction]);

  useEffect(() => {
    if (jobs.length > 0 || selectedJobId !== "all") {
      getJobApplicationsApiAction();
    } else {
      setApplications([]);
      setLoading(false);
    }
  }, [getJobApplicationsApiAction, jobs.length, selectedJobId]);

  const updateApplicationStatusApiAction = async (
    jobId: string,
    applicationId: string,
    newStatus: string,
  ) => {
    if (!userName) return;
    setUpdatingId(applicationId);
    try {
      await updateApplicationStatusApi(userName, jobId, applicationId, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status: newStatus as TJobApplicationStatus }
            : app,
        ),
      );
      toast.success("Status updated");
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getJobTitle = (jobId: string) =>
    jobs.find((j) => j._id === jobId)?.title ?? jobId.slice(-8);

  const filteredApps =
    selectedStatus === "all"
      ? applications
      : applications.filter((a) => a.status === selectedStatus);

  const columns: ColumnsType<IJobApplication> = [
    {
      title: "Candidate",
      key: "candidate",
      render: (_, record) => {
        const nameField = record.answers?.find((a) =>
          a.fieldId.includes("name"),
        );
        return (
          <Paragraph $level={3} $fontWeight={500} className="!mb-0">
            {nameField?.value ?? record.applicantId?.slice(-8) ?? "—"}
          </Paragraph>
        );
      },
    },
    {
      title: "Job",
      dataIndex: "jobId",
      key: "jobId",
      render: (jobId: string) => getJobTitle(jobId),
    },
    {
      title: "Applied",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) =>
        val ? new Date(val).toLocaleDateString() : "—",
    },
    {
      title: "Status",
      key: "status",
      width: 160,
      render: (_, record) => (
        <SelectForm
          value={record.status}
          onChange={(val) =>
            updateApplicationStatusApiAction(record.jobId, record._id, val)
          }
          loading={updatingId === record._id}
          size="small"
          selectClassName="!w-[130px]"
          options={STATUS_OPTIONS.filter((s) => s.value !== "all").map((s) => ({
            value: s.value,
            label: (
              <Tag color={statusColors[s.value]} className="!mr-0">
                {s.label}
              </Tag>
            ),
          }))}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Heading $level={4}>Applications</Heading>

      <div className="flex items-center gap-4">
        <SelectForm
          value={selectedJobId}
          onChange={setSelectedJobId}
          selectClassName="!w-[220px]"
          placeholder="Filter by job"
          options={[
            { value: "all", label: "All Jobs" },
            ...jobs.map((job) => ({ value: job._id, label: job.title })),
          ]}
        />

        <SelectForm
          value={selectedStatus}
          onChange={setSelectedStatus}
          selectClassName="!w-[180px]"
          options={STATUS_OPTIONS.map((s) => ({
            value: s.value,
            label: s.label,
          }))}
        />
      </div>

      <div className="rounded-2xl border border-borders-light-1 bg-white">
        <Table
          columns={columns}
          dataSource={filteredApps}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No applications found" }}
        />
      </div>
    </div>
  );
};

export default ApplicationsList;
