import { Radio as AntdRadio, RadioProps } from "antd";
import { RadioButtonProps } from "antd/es/radio/radioButton";
import { RadioChangeEvent } from "antd/lib/radio";
import { ClassValue } from "clsx";
import React, { PropsWithChildren } from "react";
import { cn } from "../../../utils/cn";

export interface IRadioProps extends RadioProps {
  size?: "small" | "middle" | "large";
  className?: string;
  onChange?: (e: RadioChangeEvent) => void;
}

const radioSizeMapClasses: Record<string, ClassValue> = {
  small: "[&_.ant-radio-inner]:!w-4 [&_.ant-radio-inner]:!h-4",
  middle: "[&_.ant-radio-inner]:!w-5 [&_.ant-radio-inner]:!h-5",
  large: "[&_.ant-radio-inner]:!w-6 [&_.ant-radio-inner]:!h-6",
};

export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return <AntdRadio.Button {...props} />;
};

const Radio: React.FC<PropsWithChildren<IRadioProps>> = (props) => {
  const {
    disabled,
    checked,
    size = "small",
    className: passedClassNames,
    ...rest
  } = props;

  const className = cn(
    "!me-2",
    radioSizeMapClasses[size],
    "[&.ant-radio-checked_.ant-radio-inner]:!border-primary-main",
    disabled ? "[&_.ant-radio-inner]:!border-grays-gray-5" : "",
    "[&_.ant-radio-label]:text-typography-label-main",
    passedClassNames,
  );

  return (
    <AntdRadio
      {...rest}
      disabled={disabled}
      checked={checked}
      className={className}
    >
      {props.children}
    </AntdRadio>
  );
};

export default Radio;
