import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { getCompanyJobsApi, deleteCompanyJobApi } from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { COMPANY_JOB_CREATE, COMPANY_JOB_EDIT } from "../../../HOC/routes/routes";
import { toast } from "../../../utils/toast";
import type { IJob } from "../../../api/userApi/types";

const employmentTypeLabels: Record<string, string> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
  temporary: "Temporary",
  freelance: "Freelance",
};

const JobsList: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();
  const { onLogout } = useAuthContext();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  const getCompanyJobsApiAction = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      const resp = await getCompanyJobsApi(userName);
      setJobs(resp.data);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [userName, onLogout]);

  useEffect(() => {
    getCompanyJobsApiAction();
  }, [getCompanyJobsApiAction]);

  const deleteCompanyJobApiAction = async (jobId: string) => {
    if (!userName) return;
    try {
      await deleteCompanyJobApi(userName, jobId);
      toast.success("Job deleted");
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to delete job");
    }
  };

  const columns: ColumnsType<IJob> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <Paragraph $level={3} $fontWeight={500} className="!mb-0">
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record.category?.categoryName ?? "—",
    },
    {
      title: "Location",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Type",
      dataIndex: "employmentType",
      key: "employmentType",
      render: (val: string) => (
        <Tag>{employmentTypeLabels[val] ?? val}</Tag>
      ),
    },
    {
      title: "Remote",
      dataIndex: "remoteOption",
      key: "remoteOption",
      render: (val: string) => (
        <Tag color={val === "remote" ? "green" : val === "hybrid" ? "blue" : undefined}>
          {val}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            color="primary"
            icon={<EditOutlined />}
            onClick={() =>
              navigate(COMPANY_JOB_EDIT(userName ?? "", record.slug))
            }
          />
          <Popconfirm
            title="Delete this job?"
            onConfirm={() => deleteCompanyJobApiAction(record._id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button type="text" color="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading $level={4}>Jobs</Heading>
        <Button
          type="filled"
          color="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(COMPANY_JOB_CREATE(userName ?? ""))}
        >
          Create Job
        </Button>
      </div>

      <div className="rounded-2xl border border-borders-light-1 bg-white">
        <Table
          columns={columns}
          dataSource={jobs}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default JobsList;
