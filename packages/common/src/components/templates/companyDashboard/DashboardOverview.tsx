import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleOutlined,
  FileTextOutlined,
  EyeOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { getCompanyStatsApi } from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { toast } from "../../../utils/toast";
import type { ICompanyStats, IJobApplication } from "../../../api/userApi/types";

const statusColors: Record<string, string> = {
  submitted: "default",
  reviewing: "processing",
  rejected: "error",
  hired: "success",
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-borders-light-1 bg-white p-5">
    <div
      className="flex h-12 w-12 items-center justify-center rounded-xl text-lg"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {icon}
    </div>
    <div>
      <Paragraph $level={4} className="!mb-0 text-typography-placeholder">
        {label}
      </Paragraph>
      <Heading $level={5} className="!mb-0">
        {value}
      </Heading>
    </div>
  </div>
);

const DashboardOverview: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const { onLogout } = useAuthContext();
  const [stats, setStats] = useState<ICompanyStats | null>(null);
  const [loading, setLoading] = useState(true);

  const getCompanyStatsApiAction = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      const resp = await getCompanyStatsApi(userName);
      setStats(resp.data);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }, [userName, onLogout]);

  useEffect(() => {
    getCompanyStatsApiAction();
  }, [getCompanyStatsApiAction]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const recentApps = stats?.recentApplications ?? [];

  const columns: ColumnsType<IJobApplication> = [
    {
      title: "Application ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <Paragraph $level={4} $fontWeight={500} className="!mb-0">
          {text.slice(-8)}
        </Paragraph>
      ),
    },
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
      render: (text: string) => (
        <Paragraph $level={4} className="!mb-0">
          {text.slice(-8)}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => (
        <Tag color={statusColors[val] ?? "default"}>{val}</Tag>
      ),
    },
    {
      title: "Applied",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) =>
        val ? new Date(val).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <Heading $level={4}>Dashboard</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FileTextOutlined />}
          label="Active Jobs"
          value={stats?.activeJobs ?? 0}
          color="#1677ff"
        />
        <StatCard
          icon={<CheckCircleOutlined />}
          label="Total Applications"
          value={stats?.totalApplications ?? 0}
          color="#52c41a"
        />
        <StatCard
          icon={<EyeOutlined />}
          label="Closed Jobs"
          value={stats?.closedJobs ?? 0}
          color="#faad14"
        />
        <StatCard
          icon={<RiseOutlined />}
          label="Total Jobs"
          value={stats?.totalJobs ?? 0}
          color="#722ed1"
        />
      </div>

      <div className="rounded-2xl border border-borders-light-1 bg-white">
        <div className="border-b border-borders-light-1 px-6 py-4">
          <Heading $level={5} className="!mb-0">
            Recent Applications
          </Heading>
        </div>
        <Table
          columns={columns}
          dataSource={recentApps}
          rowKey="_id"
          pagination={false}
          locale={{ emptyText: "No recent applications" }}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
