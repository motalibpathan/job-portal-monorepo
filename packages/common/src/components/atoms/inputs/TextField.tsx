import { Input, InputProps } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React, { KeyboardEventHandler, ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface ITextFieldProps extends InputProps {
  innerRef?: React.Ref<any>;
  size?: SizeType;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  allowClear?: boolean;
  autoFocus?: boolean;
  className?: string;
  status?: "error" | "warning";
}

const TextField: React.FC<ITextFieldProps> = (props) => {
  const {
    innerRef,
    size,
    defaultValue,
    value,
    disabled,
    placeholder,
    className,
    maxLength,
    id,
    name,
    type,
    prefix,
    suffix,
    onChange,
    onFocus,
    onPressEnter,
    allowClear,
    autoFocus,
    addonBefore,
    addonAfter,
    status,
    ...rest
  } = props;

  const combinedClassName = cn(
    "w-full",
    "disabled:text-typography-label-light-1",
    type === "number" && [
      "[&::-webkit-outer-spin-button]:appearance-none",
      "[&::-webkit-inner-spin-button]:appearance-none",
      "[&::-webkit-outer-spin-button]:m-0",
      "[&::-webkit-inner-spin-button]:m-0",
      "appearance-none",
      "[-moz-appearance:textfield]",
    ],
    className,
  );

  return (
    <Input
      id={id}
      type={type}
      name={name}
      ref={innerRef}
      size={size || "large"}
      defaultValue={defaultValue}
      value={value}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      disabled={disabled}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      maxLength={maxLength}
      onChange={onChange}
      onFocus={onFocus}
      onPressEnter={onPressEnter}
      className={combinedClassName}
      allowClear={allowClear}
      autoFocus={autoFocus}
      status={status}
      {...rest}
    />
  );
};

export default TextField;
