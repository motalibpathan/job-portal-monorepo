import { SizeType } from "antd/lib/config-provider/SizeContext";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { ReactNode } from "react";
import { cn } from "../../../../utils/cn";
import { NumberField } from "../../../atoms/inputs";
import { FormLabel, TLabelLevel } from "../../../atoms/typography/label";
import { Message } from "../../texts/message";

export interface INumberFieldFormProps {
  innerRef?: any;
  className?: string;
  inputFieldClassName?: string;
  labelText?: string;
  labelSize?: TLabelLevel;
  required?: boolean;
  errorMessage?: string;
  size?: SizeType;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  helperText?: string;
  id?: string;
  name?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  labelFontWeight?: 400 | 500 | 600 | 700;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  maxLength?: number;
  onChange: (value?: number) => void;
  autoFocus?: boolean;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  fullWidth?: boolean;
  onPressEnter?: () => void;
  hasError?: boolean;
  tooltipIcon?: "info" | "question";
}

const NumberFieldForm: React.FC<INumberFieldFormProps> = (props) => {
  const {
    id,
    name,
    required,
    prefix,
    suffix,
    className,
    inputFieldClassName,
    helperText,
    tooltipText,
    tooltipPlacement,
    labelText,
    labelSize,
    errorMessage,
    size,
    defaultValue,
    value,
    disabled,
    readOnly,
    placeholder,
    maxLength,
    onChange,
    labelFontWeight,
    fullWidth,
    onPressEnter,
    hasError = false,
    addonAfter,
    addonBefore,
    tooltipIcon,
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
      <div className="flex">
        <NumberField
          className={inputFieldClassName}
          id={id}
          name={name}
          size={size || "large"}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          prefix={prefix}
          suffix={suffix}
          maxLength={maxLength}
          onChange={onChange}
          onPressEnter={onPressEnter}
          status={errorMessage || hasError ? "error" : undefined}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
        />
      </div>
      {errorMessage ? (
        <Message className="pt-1" type="error" message={errorMessage} />
      ) : null}
    </div>
  );
};

export default NumberFieldForm;
