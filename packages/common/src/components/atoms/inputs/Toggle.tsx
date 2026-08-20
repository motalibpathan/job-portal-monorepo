import { Switch, SwitchProps } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import React from "react";
import { cn } from "../../../utils/cn";

interface IToggleProps extends Omit<SwitchProps, "size" | "onChange"> {
  name?: string;
  size?: "small" | "middle";
  onChange?: (
    name: string | undefined,
    checked: boolean,
    event: React.KeyboardEvent | React.MouseEvent,
  ) => void;
}

const Toggle: React.FC<IToggleProps> = (props) => {
  const { size, name, onChange, className: passedClassName, ...rest } = props;

  const toggleSize = size === "small" ? "small" : "default";

  const wrapOnChange: SwitchChangeEventHandler = (
    checked: boolean,
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (onChange) {
      onChange(name, checked, event);
    }
  };

  return (
    <Switch
      size={toggleSize}
      onChange={wrapOnChange}
      {...rest}
      className={cn(
        "box-border",
        "[&:not(.ant-switch-checked)]:!bg-background-body-1-dark-2 [&:not(.ant-switch-checked)]:!border-borders-light-1 [&:not(.ant-switch-checked)]:!border",
        "!important [&:not(.ant-switch-checked)_.ant-switch-handle]:!top-[1px]",
        "!important [&:not(.ant-switch-checked)_.ant-switch-handle]:!transform-none",
        passedClassName,
      )}
    />
  );
};

export default Toggle;
