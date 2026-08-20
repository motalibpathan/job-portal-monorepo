import React from "react";
import { cn } from "../../../../utils/cn";
import Radio, { IRadioProps } from "../../../atoms/inputs/Radio";
import { Label, TLabelLevel } from "../../../atoms/typography/label";

interface IRightLabeledRadioProps {
  labelNode?: React.ReactNode;
  labelText?: string;
  labelSize?: TLabelLevel;
  labelWeight?: number;
  radioSize?: IRadioProps["size"];
  name?: string;
  value?: IRadioProps["value"];
  checked?: IRadioProps["checked"];
  disabled?: IRadioProps["disabled"];
  defaultChecked?: IRadioProps["defaultChecked"];
  onClick?: IRadioProps["onClick"];
  onChange?: IRadioProps["onChange"];
  className?: string;
  labelClassNames?: string;
}

const RightLabeledRadio: React.FC<IRightLabeledRadioProps> = (props) => {
  const {
    labelNode,
    labelText,
    labelSize = 2,
    labelWeight = 400,
    radioSize,
    checked,
    disabled,
    defaultChecked,
    name,
    value,
    onClick,
    onChange,
    className,
    labelClassNames,
  } = props;

  return (
    <Radio
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      size={radioSize}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={className}
    >
      {labelNode ? (
        labelNode
      ) : (
        <Label
          $level={labelSize}
          $fontWeight={labelWeight}
          className={cn("inline !pr-0", labelClassNames)}
        >
          {labelText}
        </Label>
      )}
    </Radio>
  );
};

export default RightLabeledRadio;
