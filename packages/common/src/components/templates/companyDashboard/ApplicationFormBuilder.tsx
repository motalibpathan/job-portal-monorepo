import React from "react";
import { Button } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Paragraph } from "../../atoms/typography/paragraph";
import { TextFieldForm } from "../../molecules/inputs/textField";
import { SelectForm } from "../../molecules/selects";
import { Checkbox } from "../../atoms/inputs";
import type { IApplicationFormField, TJobFieldType } from "../../../api/userApi/types";

const FIELD_TYPE_OPTIONS: { value: TJobFieldType; label: string }[] = [
  { value: "short-text", label: "Short Text" },
  { value: "long-text", label: "Long Text" },
  { value: "phone-number", label: "Phone Number" },
  { value: "email", label: "Email" },
  { value: "link", label: "Link" },
  { value: "document-upload", label: "Document Upload" },
];

const DEFAULT_FIELD: Omit<IApplicationFormField, "order"> = {
  fieldId: "",
  label: "",
  fieldType: "short-text",
  required: false,
};

interface IApplicationFormBuilderProps {
  fields: IApplicationFormField[];
  onChange: (fields: IApplicationFormField[]) => void;
}

const ApplicationFormBuilder: React.FC<IApplicationFormBuilderProps> = ({
  fields,
  onChange,
}) => {
  const addField = () => {
    const newField: IApplicationFormField = {
      ...DEFAULT_FIELD,
      fieldId: `field_${Date.now()}`,
      order: fields.length,
    };
    onChange([...fields, newField]);
  };

  const removeField = (index: number) => {
    const updated = fields
      .filter((_, i) => i !== index)
      .map((f, i) => ({ ...f, order: i }));
    onChange(updated);
  };

  const updateField = (
    index: number,
    patch: Partial<IApplicationFormField>,
  ) => {
    const updated = fields.map((f, i) =>
      i === index ? { ...f, ...patch } : f,
    );
    onChange(updated);
  };

  const moveField = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fields.length) return;
    const updated = [...fields];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated.map((f, i) => ({ ...f, order: i })));
  };

  return (
    <div className="space-y-4">
      <Paragraph $level={3} $typographyPalette="subtitle" className="!mb-2">
        Add the fields applicants will fill out when applying for this job.
      </Paragraph>

      {fields.length === 0 && (
        <div className="border-borders-light-1 bg-background-body-2-light-1 rounded-xl border border-dashed p-8 text-center">
          <Paragraph $level={3} $typographyPalette="subtitle">
            No fields yet. Click "Add Field" to get started.
          </Paragraph>
        </div>
      )}

      {fields.map((field, index) => (
        <div
          key={field.fieldId}
          className="border-borders-light-1 bg-background-body-2-light-1 flex items-center gap-3 rounded-xl border p-4"
        >
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              className="text-primary-main text-xs disabled:opacity-30"
              disabled={index === 0}
              onClick={() => moveField(index, -1)}
            >
              ↑
            </button>
            <button
              type="button"
              className="text-primary-main text-xs disabled:opacity-30"
              disabled={index === fields.length - 1}
              onClick={() => moveField(index, 1)}
            >
              ↓
            </button>
          </div>

          <div className="flex flex-1 items-end gap-3">
            <TextFieldForm
              labelText="Field Label"
              name={`field_label_${index}`}
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateField(index, { label: e.target.value })}
              className="flex-1"
            />
            <SelectForm
              labelText="Field Type"
              name={`field_type_${index}`}
              value={field.fieldType}
              onChange={(val: TJobFieldType) => updateField(index, { fieldType: val })}
              options={FIELD_TYPE_OPTIONS}
              className="flex-1"
            />
            <div className="my-auto flex items-center justify-center px-4 pt-8">
              <Checkbox
                checked={field.required}
                onChange={(e) => updateField(index, { required: e.target.checked })}
              >
                Required
              </Checkbox>
            </div>
          </div>

          <Button
            type="text"
            color="danger"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeField(index)}
            size={"large"}
          />
        </div>
      ))}

      <Button type="dashed" icon={<PlusOutlined />} onClick={addField} block size={"large"}>
        Add Field
      </Button>
    </div>
  );
};

export default ApplicationFormBuilder;
