import { Checkbox as AntdCheckbox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import { ClassValue } from "clsx";
import React from "react";
import { cn } from "../../../utils/cn";

export interface ICheckboxProps extends CheckboxProps {
  name?: string;
  size?: "small" | "middle" | "large";
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
}

const getBorderColor = (isChecked?: boolean, isDisabled?: boolean) => {
  if (isDisabled) return "[&_.ant-checkbox-inner]:!border-grays-gray-5";
  return isChecked
    ? "[&_.ant-checkbox-inner]:!border-primary-main"
    : "[&_.ant-checkbox-inner]:!border-borders-main";
};

const checkboxSizeMapClasses: Record<string, ClassValue> = {
  small: "[&_.ant-checkbox-inner]:!w-4 [&_.ant-checkbox-inner]:!h-4",
  middle: "[&_.ant-checkbox-inner]:w-5 [&_.ant-checkbox-inner]:!h-5",
  large: "[&_.ant-checkbox-inner]:!w-6 [&_.ant-checkbox-inner]:!h-6",
};

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { checked, disabled, size = "small", className } = props;
  return (
    <AntdCheckbox
      {...props}
      checked={checked}
      disabled={disabled}
      className={cn(
        checkboxSizeMapClasses[size],
        getBorderColor(checked, disabled),
        disabled
          ? "hover:[&_.ant-checkbox-inner]:!border-grays-gray-5"
          : "hover:[&_.ant-checkbox-inner]:!border-primary-main",
        checked && !disabled
          ? "hover:[&_.ant-checkbox-inner]:!bg-primary-main"
          : "",
        "[&_.ant-checkbox-label]:text-typography-label-main",
        className,
      )}
    >
      {props.children}
    </AntdCheckbox>
  );
};

export default Checkbox;
