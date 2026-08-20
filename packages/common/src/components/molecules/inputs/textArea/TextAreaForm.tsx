import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { cn } from "../../../../utils/cn";
import { TextArea } from "../../../atoms/inputs";
import { FormLabel, TLabelLevel } from "../../../atoms/typography/label";
import { Message } from "../../texts/message";

interface IMyProps {
  labelText?: string;
  labelSize?: TLabelLevel;
  errorMessage?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  labelFontWeight?: 400 | 500 | 600 | 700;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  placeholder?: string;
  id?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextAreaForm: React.FC<IMyProps> = (props) => {
  const {
    required,
    className,
    maxLength,
    showCount,
    labelText,
    labelSize,
    helperText,
    labelFontWeight,
    errorMessage,
    defaultValue,
    value,
    disabled,
    placeholder,
    id,
    tooltipText,
    tooltipPlacement,
    name,
    rows,
    onChange,
    onFocus,
    allowClear,
  } = props;

  return (
    <div className={cn("flex w-full flex-col p-0", className)}>
      {labelText ? (
        <div className="flex flex-col pb-2">
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
        <TextArea
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          name={name}
          rows={rows}
          maxLength={maxLength}
          showCount={showCount}
          onChange={onChange}
          onFocus={onFocus}
          allowClear={allowClear}
          status={errorMessage ? "error" : undefined}
        />
      </div>
      {errorMessage ? (
        <Message className="pt-1" type="error" message={errorMessage} />
      ) : null}
    </div>
  );
};

export default TextAreaForm;
