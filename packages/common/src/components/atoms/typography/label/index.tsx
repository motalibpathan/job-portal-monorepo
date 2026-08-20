import { InfoCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/es/tooltip";
import React, { PropsWithChildren } from "react";
import { Tooltip } from "antd";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

type TTextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";

type TLabelLevel = 1 | 2 | 3 | 4;

const labelFontSizeClasses: Record<TLabelLevel, string> = {
  1: "text-[--text-label-1] max-md:text-[0.8125rem]",
  2: "text-[--text-label-2] max-md:text-[0.75rem]",
  3: "text-[--text-label-3] max-md:text-[0.6875rem]",
  4: "text-[--text-label-4] max-md:text-[0.625rem]",
};

const labelLineHeightClasses: Record<TLabelLevel, string> = {
  1: "leading-[--leading-label-1] max-md:leading-[1.25rem]",
  2: "leading-[--leading-label-2] max-md:leading-[1.125rem]",
  3: "leading-[--leading-label-3] max-md:leading-[1rem]",
  4: "leading-[--leading-label-4] max-md:leading-[0.875rem]",
};

const labelFontWeightClasses: Record<TLabelLevel, string> = {
  1: "font-medium",
  2: "font-medium",
  3: "font-medium",
  4: "font-medium",
};

interface IProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLElement> {
  $level?: TLabelLevel;
  $as?: "label" | "span" | "div";
  $required?: boolean;
}

const Label: React.FC<PropsWithChildren<IProps>> = ({
  children,
  $level = 1,
  $as = "label",
  $required,
  className,
  $typographyPalette = "label",
  $colorPalette,
  $variant = "main",
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    labelFontSizeClasses[$level],
    labelLineHeightClasses[$level],
    labelFontWeightClasses[$level],
    "tracking-wide font-sans",
    getTypographyCommonClassNames({
      $typographyPalette,
      $colorPalette,
      $variant,
      $textAlign,
      $fontWeight,
    }),
    className,
  );

  const Tag = $as as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    { className: classNameToUse, ...rest },
    children,
    $required && React.createElement("span", { className: "text-danger-main ml-0.5" }, "*"),
  );
};

interface IRequiredLabel {
  text: string;
  required?: boolean;
  showOptional?: boolean;
  helperText?: string;
  fontWeight?: 400 | 500 | 600 | 700;
  textAlign?: TTextAlign;
  level?: TLabelLevel;
  className?: string;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  tooltipIcon?: "info" | "question";
}

const FormLabel: React.FC<IRequiredLabel> = ({
  required,
  text,
  fontWeight,
  level,
  textAlign,
  className,
  showOptional,
  helperText,
  tooltipText,
  tooltipPlacement,
  tooltipIcon = "question",
}) => {
  const TooltipIcon =
    tooltipIcon === "info" ? InfoCircleFilled : QuestionCircleOutlined;

  return (
    <Label
      $fontWeight={fontWeight}
      $level={level}
      $textAlign={textAlign}
      className={className}
    >
      {text}
      {required ? (
        <span className="text-danger-main">&nbsp;*</span>
      ) : null}
      {showOptional && !required ? (
        <span className="text-typography-caption-main font-normal">
          &nbsp;(Optional)
        </span>
      ) : null}
      {helperText ? (
        <span className="text-typography-caption-main font-normal">
          &nbsp;({helperText})
        </span>
      ) : null}
      {tooltipText ? (
        <Tooltip
          title={tooltipText}
          placement={tooltipPlacement}
          className="text-primary-main"
        >
          &nbsp;
          <TooltipIcon />
        </Tooltip>
      ) : null}
    </Label>
  );
};

export { Label, FormLabel };
export type { TLabelLevel };
