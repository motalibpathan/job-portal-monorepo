import { Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React, { ReactNode } from "react";

interface IPasswordFieldProps {
  size?: SizeType;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  visibilityToggle?: boolean;
  autoFocus?: boolean;
  status?: "error" | "warning";
  className?: string;
}

const PasswordField: React.FC<IPasswordFieldProps> = (props) => {
  const {
    size,
    value,
    disabled,
    placeholder,
    id,
    name,
    prefix,
    suffix,
    onChange,
    onFocus,
    onPressEnter,
    visibilityToggle,
    autoFocus,
    status,
    className,
  } = props;

  return (
    <Input.Password
      size={size || "large"}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      id={id}
      name={name}
      prefix={prefix}
      suffix={suffix}
      onChange={onChange}
      onFocus={onFocus}
      onPressEnter={onPressEnter}
      visibilityToggle={visibilityToggle}
      autoFocus={autoFocus}
      status={status}
      className={className}
    />
  );
};

export default PasswordField;
