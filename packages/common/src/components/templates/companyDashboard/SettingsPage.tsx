import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popconfirm } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import { deleteCompanyApi } from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { HOME } from "../../../HOC/routes/routes";
import { toast } from "../../../utils/toast";
import CategoryManager from "./CategoryManager";

const SettingsPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();
  const { setCompany } = useCompanyContext();
  const { onLogout } = useAuthContext();
  const [deleting, setDeleting] = useState(false);

  const deleteCompanyApiAction = async () => {
    if (!userName) return;
    setDeleting(true);
    try {
      await deleteCompanyApi(userName);
      setCompany(null);
      toast.success("Company deleted");
      navigate(HOME);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to delete company");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Heading $level={4}>Settings</Heading>

      <div className="rounded-2xl border border-borders-light-1 bg-white p-6">
        <CategoryManager />
      </div>

      <div className="rounded-2xl border border-danger-light-1 bg-danger-light-5 p-6">
        <div className="flex items-start gap-3">
          <ExclamationCircleOutlined className="mt-1 text-lg text-danger-main" />
          <div className="flex-1">
            <Heading $level={5} className="!mb-1">
              Danger Zone
            </Heading>
            <Paragraph $level={4} className="!mb-4 text-typography-placeholder">
              Permanently delete this company and all associated data. This
              action cannot be undone.
            </Paragraph>
            <Popconfirm
              title="Delete this company?"
              description="All jobs, applications, and data will be permanently removed."
              onConfirm={deleteCompanyApiAction}
              okText="Delete Company"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="outlined"
                color="danger"
                icon={<DeleteOutlined />}
                loading={deleting}
              >
                Delete Company
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
