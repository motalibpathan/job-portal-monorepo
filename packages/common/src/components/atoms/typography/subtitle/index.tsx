import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

type TSubtitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

const subtitleFontSizeClasses: Record<TSubtitleLevel, string> = {
  1: "text-[--text-subtitle-1] max-md:text-[1rem]",
  2: "text-[--text-subtitle-2] max-md:text-[0.9375rem]",
  3: "text-[--text-subtitle-3] max-md:text-[0.875rem]",
  4: "text-[--text-subtitle-4] max-md:text-[0.8125rem]",
  5: "text-[--text-subtitle-5] max-md:text-[0.75rem]",
  6: "text-[--text-subtitle-6] max-md:text-[0.6875rem]",
};

const subtitleLineHeightClasses: Record<TSubtitleLevel, string> = {
  1: "leading-[--leading-subtitle-1] max-md:leading-[1.625rem]",
  2: "leading-[--leading-subtitle-2] max-md:leading-[1.5rem]",
  3: "leading-[--leading-subtitle-3] max-md:leading-[1.375rem]",
  4: "leading-[--leading-subtitle-4] max-md:leading-[1.25rem]",
  5: "leading-[--leading-subtitle-5] max-md:leading-[1.125rem]",
  6: "leading-[--leading-subtitle-6] max-md:leading-[1rem]",
};

const subtitleFontWeightClasses: Record<TSubtitleLevel, string> = {
  1: "font-normal",
  2: "font-normal",
  3: "font-normal",
  4: "font-normal",
  5: "font-normal",
  6: "font-normal",
};

interface IProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLElement> {
  $level?: TSubtitleLevel;
  $as?: "p" | "span" | "div";
}

const Subtitle: React.FC<PropsWithChildren<IProps>> = ({
  children,
  $level = 1,
  $as = "p",
  className,
  $typographyPalette = "subtitle",
  $colorPalette,
  $variant,
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    subtitleFontSizeClasses[$level],
    subtitleLineHeightClasses[$level],
    subtitleFontWeightClasses[$level],
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

  const Tag = $as as keyof JSX.IntrinsicElements;

  return React.createElement(Tag, { className: classNameToUse, ...rest }, children);
};

export { Subtitle };
export type { TSubtitleLevel };
