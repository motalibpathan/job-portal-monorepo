import { Checkbox as AntdCheckbox } from "antd";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import React from "react";
import { cn } from "../../../../utils/cn";
import { ICheckboxProps } from "../../../atoms/inputs/Checkbox";
import RightLabeledCheckbox from "./RightLabeledCheckbox";

export interface ICheckboxGroupOption {
  key: string | number;
  name?: string;
  value?: ICheckboxProps["value"];
  checked?: ICheckboxProps["checked"];
  text?: string;
  fontWeight?: number;
  checkboxSize?: ICheckboxProps["size"];
}

interface ICheckboxGroupProps extends Omit<CheckboxGroupProps, "options"> {
  options?: ICheckboxGroupOption[];
  optionContainerClassNames?: string;
}

const CheckboxGroup: React.FC<ICheckboxGroupProps> = ({
  children,
  options,
  optionContainerClassNames,
  ...rest
}) => {
  return (
    <AntdCheckbox.Group {...rest}>
      {children ? (
        children
      ) : options && options.length ? (
        <div className={cn("flex items-center", optionContainerClassNames)}>
          {options.map((option) => (
            <RightLabeledCheckbox
              key={option.key}
              labelText={option.text}
              labelWeight={option.fontWeight}
              value={option.value}
              checked={option.checked}
              checkboxSize={option.checkboxSize}
            />
          ))}
        </div>
      ) : null}
    </AntdCheckbox.Group>
  );
};

export default CheckboxGroup;
