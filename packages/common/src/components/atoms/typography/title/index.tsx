import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

type TTitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

const titleFontSizeClasses: Record<TTitleLevel, string> = {
  1: "text-[--text-title-1] max-md:text-[1.25rem]",
  2: "text-[--text-title-2] max-md:text-[1.125rem]",
  3: "text-[--text-title-3] max-md:text-[1rem]",
  4: "text-[--text-title-4] max-md:text-[0.9375rem]",
  5: "text-[--text-title-5] max-md:text-[0.875rem]",
  6: "text-[--text-title-6] max-md:text-[0.8125rem]",
};

const titleLineHeightClasses: Record<TTitleLevel, string> = {
  1: "leading-[--leading-title-1] max-md:leading-[1.75rem]",
  2: "leading-[--leading-title-2] max-md:leading-[1.625rem]",
  3: "leading-[--leading-title-3] max-md:leading-[1.5rem]",
  4: "leading-[--leading-title-4] max-md:leading-[1.375rem]",
  5: "leading-[--leading-title-5] max-md:leading-[1.25rem]",
  6: "leading-[--leading-title-6] max-md:leading-[1.125rem]",
};

const titleFontWeightClasses: Record<TTitleLevel, string> = {
  1: "font-semibold",
  2: "font-semibold",
  3: "font-medium",
  4: "font-medium",
  5: "font-medium",
  6: "font-medium",
};

interface IProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLElement> {
  $level?: TTitleLevel;
  $as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
}

const Title: React.FC<PropsWithChildren<IProps>> = ({
  children,
  $level = 3,
  $as,
  className,
  $typographyPalette = "title",
  $colorPalette,
  $variant,
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    titleFontSizeClasses[$level],
    titleLineHeightClasses[$level],
    titleFontWeightClasses[$level],
    "tracking-tight font-sans",
    getTypographyCommonClassNames({
      $typographyPalette,
      $colorPalette,
      $variant,
      $textAlign,
      $fontWeight,
    }),
    className,
  );

  const defaultElement = $level <= 3 ? `h${$level}` : "div";
  const Tag = ($as || defaultElement) as keyof JSX.IntrinsicElements;

  return React.createElement(Tag, { className: classNameToUse, ...rest }, children);
};

export { Title };
