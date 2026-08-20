import { cn } from "../../../utils/cn";
import { InputNumber } from "antd";
import { InputNumberProps } from "antd/es/input-number";
import React from "react";

interface IMyProps extends Omit<InputNumberProps, "onChange"> {
  innerRef?: React.Ref<HTMLInputElement>;
  onChange: (value?: number) => void;
  bordered?: boolean;
}

const NumberField: React.FC<IMyProps> = (props) => {
  const {
    innerRef,
    size = "large",
    defaultValue,
    value,
    disabled,
    placeholder,
    className,
    id,
    name,
    prefix,
    suffix,
    min,
    max,
    step,
    precision,
    onChange,
    onFocus,
    onPressEnter,
    bordered = true,
    readOnly,
    status,
    controls = false,
    formatter,
    parser,
    ...rest
  } = props;

  const handleOnChange = (value: number | string | null) => {
    const numericValue = typeof value === "string" ? Number(value) : value;
    onChange(numericValue ?? undefined);
  };

  return (
    <InputNumber
      ref={innerRef}
      id={id}
      size={size}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleOnChange}
      name={name}
      prefix={prefix}
      suffix={suffix}
      min={min}
      max={max}
      step={step}
      precision={precision}
      onFocus={onFocus}
      onPressEnter={onPressEnter}
      className={cn("w-full", className)}
      variant={bordered ? "outlined" : "borderless"}
      readOnly={readOnly}
      status={status}
      controls={controls}
      formatter={formatter}
      parser={parser}
      {...rest}
    />
  );
};

export default NumberField;
