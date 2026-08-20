import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

type TCaptionLevel = 1 | 2 | 3;

const captionFontSizeClasses: Record<TCaptionLevel, string> = {
  1: "text-[--text-caption-1] max-md:text-[0.6875rem]",
  2: "text-[--text-caption-2] max-md:text-[0.625rem]",
  3: "text-[--text-caption-3] max-md:text-[0.5625rem]",
};

const captionLineHeightClasses: Record<TCaptionLevel, string> = {
  1: "leading-[--leading-caption-1] max-md:leading-[1rem]",
  2: "leading-[--leading-caption-2] max-md:leading-[0.875rem]",
  3: "leading-[--leading-caption-3] max-md:leading-[0.75rem]",
};

const captionFontWeightClasses: Record<TCaptionLevel, string> = {
  1: "font-normal",
  2: "font-normal",
  3: "font-normal",
};

interface IProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLElement> {
  $level?: TCaptionLevel;
  $as?: "span" | "p" | "div";
}

const Caption: React.FC<PropsWithChildren<IProps>> = ({
  children,
  $level = 1,
  $as = "span",
  className,
  $typographyPalette = "caption",
  $colorPalette,
  $variant = "main",
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    captionFontSizeClasses[$level],
    captionLineHeightClasses[$level],
    captionFontWeightClasses[$level],
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

  return React.createElement(Tag, { className: classNameToUse, ...rest }, children);
};

export { Caption };
