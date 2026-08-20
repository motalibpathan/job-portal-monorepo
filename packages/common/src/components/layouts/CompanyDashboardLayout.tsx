import {
  CreditCardOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { PropsWithChildren, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../atoms/buttons";
import { Paragraph } from "../atoms/typography/paragraph";
import { useCompanyContext } from "../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../HOC/contexts/General/AuthContext/useAuthContext";
import {
  COMPANY_APPLICATIONS,
  COMPANY_BILLING,
  COMPANY_DASHBOARD,
  COMPANY_INFO,
  COMPANY_JOBS,
  COMPANY_SETTINGS,
  COMPANY_TEAM,
} from "../../HOC/routes/routes";

const { Sider, Header, Content } = Layout;

const CompanyDashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userName } = useParams<{ userName: string }>();
  const { company, setCompany } = useCompanyContext();
  const { user, onLogout } = useAuthContext();

  const menuItems = useMemo(() => {
    if (!userName) return [];
    return [
      {
        key: COMPANY_DASHBOARD(userName),
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
      {
        key: COMPANY_JOBS(userName),
        icon: <FileTextOutlined />,
        label: "Jobs",
      },
      {
        key: COMPANY_APPLICATIONS(userName),
        icon: <SolutionOutlined />,
        label: "Applications",
      },
      {
        key: COMPANY_INFO(userName),
        icon: <ShopOutlined />,
        label: "Company",
      },
      {
        key: COMPANY_TEAM(userName),
        icon: <TeamOutlined />,
        label: "Team",
      },
      {
        key: COMPANY_SETTINGS(userName),
        icon: <SettingOutlined />,
        label: "Settings",
      },
      {
        key: COMPANY_BILLING(userName),
        icon: <CreditCardOutlined />,
        label: "Billing",
      },
    ];
  }, [userName]);

  const selectedKey = useMemo(() => {
    if (!userName) return "";
    const sections = [
      COMPANY_DASHBOARD(userName),
      COMPANY_JOBS(userName),
      COMPANY_APPLICATIONS(userName),
      COMPANY_INFO(userName),
      COMPANY_TEAM(userName),
      COMPANY_SETTINGS(userName),
      COMPANY_BILLING(userName),
    ];
    return (
      sections.find(
        (key) => pathname === key || pathname.startsWith(`${key}/`),
      ) ?? ""
    );
  }, [pathname, userName]);

  const handleLogout = () => {
    setCompany(null);
    onLogout();
  };

  return (
    <Layout className="min-h-screen bg-background-body-2-light-1">
      {userName ? (
        <Sider
          width={240}
          theme="light"
          className="!bg-white border-r border-borders-light-1 sticky top-0 h-screen"
        >
          <div className="flex h-16 items-center border-b border-borders-light-1 px-6">
            <Paragraph
              $level={4}
              $fontWeight={600}
              className="!mb-0 truncate"
            >
              {company?.name || "Company"}
            </Paragraph>
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={({ key }) => navigate(key)}
            className="border-none"
          />
        </Sider>
      ) : null}
      <Layout className="bg-transparent">
        <Header
          className="!bg-white flex h-16 items-center justify-between border-b border-borders-light-1 sticky top-0 z-10"
          style={{ padding: "0 24px", lineHeight: "normal" }}
        >
          <Paragraph
            $level={3}
            $fontWeight={600}
            className="!mb-0 truncate"
          >
            {company?.name || "Company Portal"}
          </Paragraph>
          <div className="flex items-center gap-4">
            <Paragraph
              $level={5}
              $typographyPalette="subtitle"
              className="!mb-0"
            >
              {user?.name || user?.email}
            </Paragraph>
            <Button type="text" color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content className="p-8">{children}</Content>
      </Layout>
    </Layout>
  );
};

export { CompanyDashboardLayout };
