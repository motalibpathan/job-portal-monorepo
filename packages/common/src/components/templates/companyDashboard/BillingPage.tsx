import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import {
  getBillingSubscriptionApi,
  getBillingTransactionsApi,
} from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { toast } from "../../../utils/toast";
import {
  COMPANY_PLAN_TEXT_MAP,
  PLAN_CONFIG,
  SUBSCRIPTION_STATUS_COLOR_MAP,
  SUBSCRIPTION_STATUS_TEXT_MAP,
  type IBillingSubscriptionResponse,
  type ISubscription,
  type TCompanyPlan,
} from "../../../api/userApi/types";

const BillingPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const { onLogout } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] =
    useState<IBillingSubscriptionResponse | null>(null);
  const [transactions, setTransactions] = useState<ISubscription[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      const res = await getBillingSubscriptionApi(userName);
      setSubscriptionData(res.data);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load subscription");
    } finally {
      setLoading(false);
    }
  }, [userName, onLogout]);

  const fetchTransactions = useCallback(async () => {
    if (!userName) return;
    setTransactionsLoading(true);
    try {
      const res = await getBillingTransactionsApi(userName);
      setTransactions(res.data.transactions);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load transactions");
    } finally {
      setTransactionsLoading(false);
    }
  }, [userName, onLogout]);

  useEffect(() => {
    fetchSubscription();
    fetchTransactions();
  }, [fetchSubscription, fetchTransactions]);

  const plans: TCompanyPlan[] = ["free", "bootstrap", "startup", "business"];

  const transactionColumns: ColumnsType<ISubscription> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) => new Date(val).toLocaleDateString(),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (val: TCompanyPlan) => COMPANY_PLAN_TEXT_MAP[val],
    },
    {
      title: "Billing Cycle",
      dataIndex: "billingCycle",
      key: "billingCycle",
      render: (val: string) =>
        val === "monthly" ? "Monthly" : "Yearly",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (val: number) => `$${(val / 100).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => (
        <Tag color={SUBSCRIPTION_STATUS_COLOR_MAP[val as keyof typeof SUBSCRIPTION_STATUS_COLOR_MAP]}>
          {SUBSCRIPTION_STATUS_TEXT_MAP[val as keyof typeof SUBSCRIPTION_STATUS_TEXT_MAP]}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val: string) => new Date(val).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val: string) => new Date(val).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  const currentPlan = subscriptionData?.plan || "free";
  const planConfig = PLAN_CONFIG[currentPlan];
  const activeJobCount = subscriptionData?.activeJobCount || 0;

  return (
    <div className="space-y-8">
      <Heading $level={4}>Billing</Heading>

      {/* Current Plan Card */}
      <div className="rounded-2xl border border-borders-light-1 bg-white p-6">
        <Heading $level={5} className="!mb-4">
          Current Plan
        </Heading>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-borders-light-1 bg-background-body-2-light-1 px-6 py-4">
            <Paragraph $level={3} $fontWeight={600} className="!mb-0">
              {COMPANY_PLAN_TEXT_MAP[currentPlan]}
            </Paragraph>
            <Paragraph
              $level={4}
              $typographyPalette="subtitle"
              className="!mb-0"
            >
              ${planConfig.price}/month
            </Paragraph>
          </div>
          <div className="flex-1">
            <Paragraph $level={4} className="!mb-1">
              Active Jobs:{" "}
              <strong>
                {activeJobCount} / {planConfig.activeJobLimit}
              </strong>
            </Paragraph>
            <Paragraph $level={4} className="!mb-1">
              Team Members:{" "}
              <strong>
                {planConfig.teamMembers === Infinity
                  ? "Unlimited"
                  : planConfig.teamMembers}
              </strong>
            </Paragraph>
            {subscriptionData?.planExpiresAt && (
              <Paragraph $level={4} className="!mb-0">
                Expires:{" "}
                <strong>
                  {new Date(
                    subscriptionData.planExpiresAt,
                  ).toLocaleDateString()}
                </strong>
              </Paragraph>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div className="rounded-2xl border border-borders-light-1 bg-white p-6">
        <Heading $level={5} className="!mb-4">
          Upgrade Plan
        </Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((planKey) => {
            const config = PLAN_CONFIG[planKey];
            const isCurrent = planKey === currentPlan;
            return (
              <div
                key={planKey}
                className={`rounded-xl border p-4 ${
                  isCurrent
                    ? "border-primary-main bg-primary-light-5"
                    : "border-borders-light-1"
                }`}
              >
                <Paragraph $level={4} $fontWeight={600} className="!mb-1">
                  {COMPANY_PLAN_TEXT_MAP[planKey]}
                </Paragraph>
                <Paragraph $level={3} $fontWeight={600} className="!mb-2">
                  ${config.price}/mo
                </Paragraph>
                <Paragraph
                  $level={4}
                  $typographyPalette="subtitle"
                  className="!mb-1"
                >
                  {config.activeJobLimit} active jobs
                </Paragraph>
                <Paragraph
                  $level={4}
                  $typographyPalette="subtitle"
                  className="!mb-3"
                >
                  {config.teamMembers === Infinity
                    ? "Unlimited"
                    : config.teamMembers}{" "}
                  team members
                </Paragraph>
                {isCurrent ? (
                  <Tag color="blue">Current Plan</Tag>
                ) : (
                  <Tag>Downgrade</Tag>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-borders-light-1 bg-white p-6">
        <Heading $level={5} className="!mb-4">
          Transactions
        </Heading>
        <Table
          columns={transactionColumns}
          dataSource={transactions}
          rowKey="_id"
          loading={transactionsLoading}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No transactions yet" }}
        />
      </div>
    </div>
  );
};

export default BillingPage;
