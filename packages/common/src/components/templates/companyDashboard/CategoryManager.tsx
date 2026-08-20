import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Popconfirm, Spin } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { TextFieldForm } from "../../molecules/inputs/textField";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import {
  getJobCategoriesApi,
  createJobCategoryApi,
  updateJobCategoryApi,
  deleteJobCategoryApi,
} from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import { toast } from "../../../utils/toast";
import type { IJobCategory } from "../../../api/userApi/types";

const CategoryManager: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const { company } = useCompanyContext();
  const { onLogout } = useAuthContext();
  const [categories, setCategories] = useState<IJobCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);

  const getJobCategoriesApiAction = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      const resp = await getJobCategoriesApi(userName);
      setCategories(resp.data);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [userName, onLogout]);

  useEffect(() => {
    getJobCategoriesApiAction();
  }, [getJobCategoriesApiAction]);

  const createJobCategoryApiAction = async () => {
    if (!userName || !company) return;
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setAdding(true);
    try {
      const resp = await createJobCategoryApi(userName, {
        name: newCategoryName.trim(),
        companyId: company._id,
      });
      setCategories((prev) => [...prev, resp.data]);
      setNewCategoryName("");
      toast.success("Category added");
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  const updateJobCategoryApiAction = async (categoryId: string) => {
    if (!editingName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);
    try {
      const resp = await updateJobCategoryApi(categoryId, {
        name: editingName.trim(),
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === categoryId ? resp.data : c)),
      );
      setEditingId(null);
      toast.success("Category updated");
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to update category");
    } finally {
      setSaving(false);
    }
  };

  const deleteJobCategoryApiAction = async (categoryId: string) => {
    try {
      await deleteJobCategoryApi(categoryId);
      setCategories((prev) => prev.filter((c) => c._id !== categoryId));
      toast.success("Category deleted");
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to delete category");
    }
  };

  const startEditing = (category: IJobCategory) => {
    setEditingId(category._id);
    setEditingName(category.name);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Heading $level={5}>Job Categories</Heading>

      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex items-center justify-between rounded-xl border border-borders-light-1 px-4 py-3"
          >
            {editingId === cat._id ? (
              <div className="flex flex-1 items-center gap-2">
                <TextFieldForm
                  labelText=""
                  name={`category_edit_${cat._id}`}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onPressEnter={() => updateJobCategoryApiAction(cat._id)}
                  inputClassName="!max-w-xs"
                />
                <Button
                  type="filled"
                  color="primary"
                  size="small"
                  loading={saving}
                  onClick={() => updateJobCategoryApiAction(cat._id)}
                >
                  Save
                </Button>
                <Button
                  type="text"
                  color="gray"
                  size="small"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <Paragraph $level={4} className="mb-0!">
                  {cat.name}
                </Paragraph>
                <div className="flex items-center gap-1">
                  <Button
                    type="text"
                    color="primary"
                    icon={<EditOutlined />}
                    onClick={() => startEditing(cat)}
                  />
                  <Popconfirm
                    title="Delete this category?"
                    onConfirm={() => deleteJobCategoryApiAction(cat._id)}
                    okText="Delete"
                    cancelText="Cancel"
                  >
                    <Button
                      type="text"
                      color="danger"
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <TextFieldForm
          labelText=""
          name="new_category"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onPressEnter={createJobCategoryApiAction}
          inputClassName="!max-w-xs"
        />
        <Button
          type="filled"
          color="primary"
          icon={<PlusOutlined />}
          loading={adding}
          onClick={createJobCategoryApiAction}
          size={"large"}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryManager;
