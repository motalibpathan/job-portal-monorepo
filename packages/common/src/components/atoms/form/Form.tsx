import { Form as AntdForm, FormProps } from "antd";
import React, { PropsWithChildren } from "react";
import { cn } from "../../../utils/cn";

export interface IFormProps extends Omit<FormProps, "className"> {
  className?: string;
}

const Form: React.FC<PropsWithChildren<IFormProps>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <AntdForm className={cn(className)} {...rest}>
      {children}
    </AntdForm>
  );
};

export default Form;
