import { SizeType } from "antd/lib/config-provider/SizeContext";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { ReactNode } from "react";
import { cn } from "../../../../utils/cn";
import { TextField } from "../../../atoms/inputs";
import { FormLabel, TLabelLevel } from "../../../atoms/typography/label";
import { Message } from "../../texts/message";

interface IMyProps {
  className?: string;
  labelText?: string;
  helperText?: string;
  labelSize?: TLabelLevel;
  required?: boolean;
  errorMessage?: string;
  size?: SizeType;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  subtitle?: string;
  id?: string;
  name?: string;
  type?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  labelFontWeight?: 400 | 500 | 600 | 700;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  allowClear?: boolean;
  autoFocus?: boolean;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  tooltipIcon?: "info" | "question";
  fullWidth?: boolean;
  hasError?: boolean;
  inputClassName?: string;
  readOnly?: boolean;
}

const TextFieldForm: React.FC<IMyProps> = (props) => {
  const {
    tooltipText,
    className,
    labelText,
    helperText,
    labelSize,
    errorMessage,
    size,
    defaultValue,
    value,
    disabled,
    placeholder,
    id,
    name,
    type,
    required,
    prefix,
    suffix,
    maxLength,
    onChange,
    onFocus,
    onPressEnter,
    labelFontWeight,
    allowClear,
    autoFocus,
    addonBefore,
    addonAfter,
    tooltipPlacement,
    fullWidth,
    tooltipIcon,
    hasError = false,
    inputClassName,
    readOnly,
  } = props;

  return (
    <div className={cn("flex flex-col p-0", fullWidth && "w-full", className)}>
      {labelText ? (
        <div className="flex flex-col pb-2">
          <FormLabel
            required={required}
            text={labelText}
            helperText={helperText}
            fontWeight={labelFontWeight}
            level={labelSize}
            tooltipText={tooltipText}
            tooltipPlacement={tooltipPlacement}
            tooltipIcon={tooltipIcon}
          />
        </div>
      ) : null}
      <div>
        <TextField
          id={id}
          type={type}
          name={name}
          size={size || "large"}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          prefix={prefix}
          suffix={suffix}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onPressEnter={onPressEnter}
          allowClear={allowClear}
          autoFocus={autoFocus}
          readOnly={readOnly}
          status={errorMessage || hasError ? "error" : undefined}
          className={inputClassName}
        />
      </div>
      {errorMessage ? (
        <Message className="pt-1" type="error" message={errorMessage} />
      ) : null}
    </div>
  );
};

export default TextFieldForm;
