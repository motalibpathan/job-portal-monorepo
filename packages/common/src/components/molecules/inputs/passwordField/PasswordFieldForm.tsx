import { TooltipPlacement } from "antd/es/tooltip";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React, { ReactNode } from "react";
import { cn } from "../../../../utils/cn";
import { PasswordField } from "../../../atoms/inputs";
import { FormLabel, TLabelLevel } from "../../../atoms/typography/label";
import { Message } from "../../texts/message";

interface IMyProps {
  labelText?: string;
  labelSize?: TLabelLevel;
  errorMessage?: string;
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
  required?: boolean;
  autoFocus?: boolean;
  labelFontWeight?: 400 | 500 | 600 | 700;
  helperText?: string;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  className?: string;
}

const PasswordFieldForm: React.FC<IMyProps> = (props) => {
  const {
    labelText,
    labelSize,
    errorMessage,
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
    required,
    autoFocus,
    labelFontWeight,
    helperText,
    tooltipText,
    tooltipPlacement,
    className,
  } = props;

  return (
    <div className={cn("flex flex-col p-0", className)}>
      {labelText ? (
        <div className="flex pb-2">
          <FormLabel
            required={required}
            level={labelSize}
            text={labelText}
            fontWeight={labelFontWeight}
            helperText={helperText}
            tooltipText={tooltipText}
            tooltipPlacement={tooltipPlacement}
          />
        </div>
      ) : null}
      <div className="flex">
        <PasswordField
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
          status={errorMessage ? "error" : undefined}
        />
      </div>
      {errorMessage ? (
        <Message className="pt-1" type="error" message={errorMessage} />
      ) : null}
    </div>
  );
};

export default PasswordFieldForm;
