import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

export type TParagraphLevel = 1 | 2 | 3 | 4 | 5 | 6;

const paragraphFontSizeClasses: Record<TParagraphLevel, string> = {
  1: "text-[1.125rem]",
  2: "text-base",
  3: "text-base",
  4: "text-sm",
  5: "text-sm",
  6: "text-xs",
};

const paragraphFontSizeMobileClasses: Record<TParagraphLevel, string> = {
  1: "max-md:text-base",
  2: "max-md:text-base",
  3: "max-md:text-sm",
  4: "max-md:text-sm",
  5: "max-md:text-xs",
  6: "max-md:text-xs",
};

const paragraphLineHeightClasses: Record<TParagraphLevel, string> = {
  1: "leading-[1.625rem]",
  2: "leading-6",
  3: "leading-6",
  4: "leading-[1.3125rem]",
  5: "leading-[1.3125rem]",
  6: "leading-[1.125rem]",
};

const paragraphLineHeightMobileClasses: Record<TParagraphLevel, string> = {
  1: "max-md:leading-6",
  2: "max-md:leading-6",
  3: "max-md:leading-[1.3125rem]",
  4: "max-md:leading-[1.3125rem]",
  5: "max-md:leading-[1.3125rem]",
  6: "max-md:leading-[1.125rem]",
};

const paragraphFontWeightClasses: Record<TParagraphLevel, string> = {
  1: "font-normal",
  2: "font-normal",
  3: "font-normal",
  4: "font-normal",
  5: "font-normal",
  6: "font-normal",
};

export interface IParagraphProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  $level?: TParagraphLevel;
}

const Paragraph: React.FC<PropsWithChildren<IParagraphProps>> = ({
  children,
  $level = 1,
  className,
  $typographyPalette = "paragraph",
  $colorPalette,
  $variant,
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    "atom-paragraph",
    paragraphFontSizeClasses[$level],
    paragraphFontSizeMobileClasses[$level],
    paragraphLineHeightClasses[$level],
    paragraphLineHeightMobileClasses[$level],
    paragraphFontWeightClasses[$level],
    "font-sans",
    getTypographyCommonClassNames({
      $typographyPalette,
      $colorPalette,
      $variant,
      $textAlign,
      $fontWeight,
    }),
    className,
  );

  return (
    <p className={classNameToUse} {...rest}>
      {children}
    </p>
  );
};

export { Paragraph };
