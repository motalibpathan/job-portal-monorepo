import { CheckboxChangeEvent } from "antd";
import { RadioChangeEvent } from "antd/lib";
import React, { useMemo } from "react";
import { Button } from "../../../atoms/buttons";
import { Checkbox, Toggle } from "../../../atoms/inputs";
import { ICheckboxProps } from "../../../atoms/inputs/Checkbox";
import Radio, { IRadioProps } from "../../../atoms/inputs/Radio";
import { Paragraph } from "../../../atoms/typography/paragraph";
import { Subtitle } from "../../../atoms/typography/subtitle";

export type TSelectionControlType = "checkbox" | "radio" | "toggle" | "button";

interface ISelectionControlProps {
  type: TSelectionControlType;
  title: string;
  subtitle: string;
  name?: string;
  checked?: boolean;
  buttonText?: string;
  onChange?: (checked: boolean) => void;
  buttonOnClick?: () => void;
}

const SelectionControl: React.FC<ISelectionControlProps> = ({
  type,
  title,
  subtitle,
  checked,
  onChange,
  name,
  buttonOnClick,
  buttonText,
}) => {
  const checkboxAndRadioProps = useMemo(
    (): ICheckboxProps | IRadioProps => ({
      size: "middle",
      checked,
      onChange: onChange
        ? (e: CheckboxChangeEvent | RadioChangeEvent) =>
            onChange(e.target.checked)
        : undefined,
    }),
    [checked, onChange],
  );

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex w-full flex-col gap-1">
        <Paragraph $level={2} className="font-medium">
          {title}
        </Paragraph>
        <Subtitle $level={2}>{subtitle}</Subtitle>
      </div>
      {type === "checkbox" ? <Checkbox {...checkboxAndRadioProps} /> : null}
      {type === "radio" ? <Radio {...checkboxAndRadioProps} /> : null}
      {type === "toggle" ? (
        <Toggle
          checked={checked}
          onChange={onChange ? (_, checked) => onChange(checked) : undefined}
        />
      ) : null}
      {type === "button" ? (
        <Button type="text" onClick={buttonOnClick} name={name}>
          {buttonText}
        </Button>
      ) : null}
    </div>
  );
};

export default SelectionControl;
