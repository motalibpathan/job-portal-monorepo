import React from "react";
import { cn } from "../../../utils/cn";
import { ISelectProps, Select } from "../../atoms/selects";
import { FormLabel, TLabelLevel } from "../../atoms/typography/label";
import { Subtitle, TSubtitleLevel } from "../../atoms/typography/subtitle";
import { Message } from "../texts/message";

export interface ISelectFormProps extends ISelectProps {
  labelText?: string;
  labelSize?: TLabelLevel;
  labelFontWeight?: 400 | 500 | 600 | 700;
  errorMessage?: string;
  name?: string;
  loading?: boolean;
  selectClassName?: string;
  required?: boolean;
  helperText?: string;
  subtitle?: string;
  subtitleSize?: TSubtitleLevel;
}

const SelectForm: React.FC<ISelectFormProps> = (props) => {
  const {
    labelText,
    labelSize,
    labelFontWeight,
    errorMessage,
    className,
    selectClassName,
    required,
    helperText,
    subtitle,
    subtitleSize,
    size,
    ...rest
  } = props;

  const mainContainerClasses = cn("w-full flex flex-col");

  return (
    <div className={cn(mainContainerClasses, className)}>
      {labelText ? (
        <div className="flex flex-col pb-2">
          <FormLabel
            required={required}
            text={labelText}
            level={labelSize}
            fontWeight={labelFontWeight}
            helperText={helperText}
          />
          {subtitle ? (
            <Subtitle
              className="mt-2"
              $level={subtitleSize || 2}
              $fontWeight={400}
            >
              {subtitle}
            </Subtitle>
          ) : null}
        </div>
      ) : null}
      <Select
        className={cn(
          "[&_.ant-select-arrow]:text-typography-label-light-1",
          selectClassName,
        )}
        size={size ||"large"}
        {...rest}
        status={errorMessage ? "error" : rest.status}
      />
      {errorMessage ? (
        <Message className="pt-[0.2rem]" type="error" message={errorMessage} />
      ) : null}
    </div>
  );
};

export default SelectForm;
