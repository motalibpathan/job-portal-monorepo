import { AutoComplete } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  BaseOptionType,
  DefaultOptionType,
  LabelInValueType,
  RawValueType,
} from "rc-select/lib/Select";
import React from "react";
import { cn } from "../../../utils/cn";

interface IProps {
  open?: boolean;
  name?: string;
  size?: SizeType;
  options: string[];
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  status?: "error" | "warning";
  onChange?: (name: string | undefined, key: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  maxLength?: number;
  onSelect?: (
    value: RawValueType | LabelInValueType | any,
    option: DefaultOptionType | BaseOptionType | any,
  ) => void;
}

const AutoCompleteTextField: React.FC<IProps> = (props) => {
  const {
    open,
    size,
    name,
    options,
    placeholder,
    value,
    disabled,
    onChange,
    onFocus,
    onBlur,
    onSelect,
    maxLength,
    className,
    status,
  } = props;

  const opts = options.map((option) => ({ value: option }));

  function handleChange(value: string | any) {
    if (onChange) onChange(name, value);
  }

  const textfieldClasses = cn("w-full [&_input]:text-base", className);

  return (
    <AutoComplete
      className={textfieldClasses}
      open={open}
      options={opts}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSelect={onSelect}
      placeholder={placeholder}
      disabled={disabled}
      size={size || "large"}
      maxLength={maxLength}
      filterOption={(inputValue, option: any) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      status={status}
    />
  );
};

export default AutoCompleteTextField;
