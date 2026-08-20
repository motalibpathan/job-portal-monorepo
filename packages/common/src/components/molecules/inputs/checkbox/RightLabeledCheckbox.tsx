import { CheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { ReactNode } from "react";
import { cn } from "../../../../utils/cn";
import { Checkbox } from "../../../atoms/inputs";
import { ICheckboxProps } from "../../../atoms/inputs/Checkbox";
import { Label, TLabelLevel } from "../../../atoms/typography/label";

interface IRightLabeledCheckboxProps {
  labelNode?: ReactNode;
  labelText?: string;
  value?: CheckboxProps["value"];
  labelSize?: TLabelLevel;
  labelWeight?: number;
  checkboxSize?: ICheckboxProps["size"];
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
}

const RightLabeledCheckbox: React.FC<IRightLabeledCheckboxProps> = (props) => {
  const {
    labelNode,
    labelText,
    labelSize = 1,
    labelWeight,
    checkboxSize,
    name,
    onChange,
    checked,
    disabled,
    value,
    indeterminate,
    className,
    defaultChecked,
  } = props;

  return (
    <Checkbox
      name={name}
      onChange={onChange}
      size={checkboxSize}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={cn("inline-flex items-center", className)}
      indeterminate={indeterminate}
    >
      {labelNode ? (
        labelNode
      ) : (
        <Label
          $level={labelSize}
          $fontWeight={
            labelWeight
              ? labelWeight
              : labelSize === 1
                ? 600
                : labelSize === 2
                  ? 600
                  : 400
          }
          className={disabled ? "!text-grays-gray-6" : ""}
        >
          {labelText}
        </Label>
      )}
    </Checkbox>
  );
};

export default RightLabeledCheckbox;
