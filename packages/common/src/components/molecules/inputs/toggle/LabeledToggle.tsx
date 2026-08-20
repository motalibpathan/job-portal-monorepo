import { cn } from "../../../../utils/cn";
import React, { useCallback } from "react";
import { Toggle } from "../../../atoms/inputs";
import {
  Paragraph,
  TParagraphLevel,
} from "../../../atoms/typography/paragraph";

export interface ILabeledToggleProps {
  labelNode?: React.ReactNode;
  labelText?: string;
  labelSize?: TParagraphLevel;
  labelWeight?: number;
  labelClassName?: string;
  rootClassName?: string;
  labelPosition?: "left" | "right";
  toggleSize?: "small" | "middle" | undefined;
  checked?: boolean;
  name?: string;
  defaultChecked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (
    name: string | undefined,
    checked: boolean,
    event: React.KeyboardEvent | React.MouseEvent,
  ) => void;
}

const LabeledToggle: React.FC<ILabeledToggleProps> = (props) => {
  const {
    labelNode,
    labelText,
    labelSize,
    toggleSize,
    labelWeight,
    labelClassName,
    labelPosition = "left",
    checked,
    name,
    defaultChecked,
    loading,
    disabled,
    rootClassName,
    className,
    onChange,
  } = props;

  const renderLabel = useCallback(() => {
    return labelNode ? (
      labelNode
    ) : (
      <Paragraph
        $level={labelSize}
        $fontWeight={
          labelWeight
            ? labelWeight
            : labelSize === 1
              ? 600
              : labelSize === 2
                ? 500
                : 400
        }
        className={labelClassName}
      >
        {labelText}
      </Paragraph>
    );
  }, [labelClassName, labelNode, labelSize, labelText, labelWeight]);

  return (
    <div className={cn("flex items-center gap-2", rootClassName)}>
      {labelPosition === "left" && renderLabel()}
      <Toggle
        size={toggleSize}
        checked={checked}
        name={name}
        defaultChecked={defaultChecked}
        loading={loading}
        disabled={disabled}
        onChange={onChange}
        className={className}
      />
      {labelPosition === "right" && renderLabel()}
    </div>
  );
};

export default LabeledToggle;
