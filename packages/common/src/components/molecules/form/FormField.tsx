import { Form as AntdForm, FormItemProps } from "antd";
import React, { PropsWithChildren } from "react";
import { cn } from "../../../utils/cn";

export interface IFormFieldProps extends Omit<FormItemProps, "className"> {
  className?: string;
}

/**
 * FormField molecule — a styled Ant Design Form.Item for consistent
 * label, validation message, and layout across forms.
 */
const FormField: React.FC<PropsWithChildren<IFormFieldProps>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <AntdForm.Item
      className={cn(
        "[&_.ant-form-item-label>label]:text-typography-label-main",
        "[&_.ant-form-item-label>label]:font-medium",
        "[&_.ant-form-item-explain-error]:text-danger-main",
        "[&_.ant-form-item-explain-error]:text-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </AntdForm.Item>
  );
};

export default FormField;
