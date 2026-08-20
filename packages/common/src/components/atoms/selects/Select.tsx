import { Select as AntdSelect, SelectProps } from "antd";
import React, { PropsWithChildren } from "react";
import { cn } from "../../../utils/cn";

export interface ISelectProps extends Omit<SelectProps, "className"> {
  className?: string;
}

const Select: React.FC<PropsWithChildren<ISelectProps>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <AntdSelect className={cn("w-full", className)} {...rest}>
      {children}
    </AntdSelect>
  );
};

export default Select;
