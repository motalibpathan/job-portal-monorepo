import { Radio as AntdRadio, RadioGroupProps } from "antd";
import React from "react";
import { cn } from "../../../../utils/cn";
import { IRadioProps } from "../../../atoms/inputs/Radio";
import { TLabelLevel } from "../../../atoms/typography/label";
import RightLabeledRadio from "./RightLabeledRadio";

export interface IRadioGroupOption {
  key: string | number;
  name?: string;
  value?: IRadioProps["value"];
  checked?: IRadioProps["checked"];
  text?: string;
  fontWeight?: number;
  radioSize?: IRadioProps["size"];
  labelSize?: TLabelLevel;
}

interface IRadioGroupProps extends Omit<RadioGroupProps, "options"> {
  options?: IRadioGroupOption[];
  optionContainerClassNames?: string;
}

const RadioGroup: React.FC<IRadioGroupProps> = ({
  children,
  options,
  optionContainerClassNames,
  ...rest
}) => {
  return (
    <AntdRadio.Group {...rest}>
      {children ? (
        children
      ) : options && options.length ? (
        <div className={cn("flex items-center", optionContainerClassNames)}>
          {options.map((option) => (
            <RightLabeledRadio
              key={option.key}
              labelText={option.text}
              labelWeight={option.fontWeight}
              value={option.value}
              checked={option.checked}
              radioSize={option.radioSize}
              labelSize={option.labelSize}
            />
          ))}
        </div>
      ) : null}
    </AntdRadio.Group>
  );
};

export default RadioGroup;
