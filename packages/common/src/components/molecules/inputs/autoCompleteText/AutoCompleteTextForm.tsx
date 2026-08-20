import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";
import { cn } from "../../../../utils/cn";
import { AutoCompleteTextField } from "../../../atoms/inputs";
import { FormLabel, TLabelLevel } from "../../../atoms/typography/label";
import { Message } from "../../texts/message";

interface IProps {
  open?: boolean;
  size?: SizeType;
  className?: string;
  labelText?: string;
  labelSize?: TLabelLevel;
  labelFontWeight?: 400 | 500 | 600 | 700;
  errorMessage?: string;
  disabled?: boolean;
  name?: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  value?: string;
  tooltipText?: string;
  tooltipIcon?: "info" | "question";
  onChange?: (name: string | undefined, key: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onSelect?: (value: string) => void;
}

const AutoCompleteTextFieldForm: React.FC<IProps> = (props) => {
  const {
    className,
    labelText,
    labelSize,
    labelFontWeight,
    errorMessage,
    value,
    disabled,
    open,
    size,
    required,
    options,
    placeholder,
    helperText,
    tooltipText,
    tooltipIcon,
    name,
    onChange,
    onFocus,
    onBlur,
    onSelect,
  } = props;

  return (
    <div className={cn("flex flex-col p-0", className)}>
      {labelText ? (
        <FormLabel
          text={labelText}
          level={labelSize}
          fontWeight={
            labelFontWeight
              ? labelFontWeight
              : labelSize === 1
                ? 600
                : labelSize === 2
                  ? 600
                  : 400
          }
          required={required}
          helperText={helperText}
          tooltipText={tooltipText}
          tooltipIcon={tooltipIcon}
          className="pb-2"
        />
      ) : null}
      <div className="flex">
        <AutoCompleteTextField
          open={open}
          size={size}
          options={options}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          status={errorMessage ? "error" : undefined}
        />
      </div>
      {errorMessage ? (
        <div className="pt-1">
          <Message type="error" message={errorMessage} />
        </div>
      ) : null}
    </div>
  );
};

export default AutoCompleteTextFieldForm;
