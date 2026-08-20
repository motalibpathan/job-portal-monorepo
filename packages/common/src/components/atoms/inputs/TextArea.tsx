import { Input } from "antd";
import React from "react";
import { cn } from "../../../utils/cn";

interface ITextAreaProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  status?: "error" | "warning";
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<ITextAreaProps> = (props) => {
  const {
    value,
    defaultValue,
    disabled,
    placeholder,
    id,
    name,
    rows,
    maxLength,
    showCount,
    allowClear,
    autoSize,
    status,
    className,
    onChange,
    onFocus,
  } = props;

  return (
    <Input.TextArea
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      showCount={showCount}
      allowClear={allowClear}
      autoSize={autoSize}
      status={status}
      onChange={onChange}
      onFocus={onFocus}
      className={cn("w-full disabled:text-typography-label-light-1", className)}
    />
  );
};

export default TextArea;
