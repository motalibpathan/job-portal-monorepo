import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils/cn";
import {
  getTypographyCommonClassNames,
  ITypographyCommonProps,
} from "../common";

type THeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingFontSizeClasses: Record<THeadingLevel, string> = {
  1: "text-6xl",
  2: "text-5xl",
  3: "text-[2.75rem]",
  4: "text-[2.25rem]",
  5: "text-[1.75rem]",
  6: "text-[1.5rem]",
};

const headingFontSizeMobileClasses: Record<THeadingLevel, string> = {
  1: "max-md:text-[1.75rem]",
  2: "max-md:text-2xl",
  3: "max-md:text-xl",
  4: "max-md:text-xl",
  5: "max-md:text-xl",
  6: "max-md:text-xl",
};

const headingLineHeightClasses: Record<THeadingLevel, string> = {
  1: "leading-[4.5rem]",
  2: "leading-[3.5rem]",
  3: "leading-[3.25rem]",
  4: "leading-[2.75rem]",
  5: "leading-[2.375rem]",
  6: "leading-8",
};

const headingLineHeightMobileClasses: Record<THeadingLevel, string> = {
  1: "max-md:leading-8",
  2: "max-md:leading-7",
  3: "max-md:leading-7",
  4: "max-md:leading-7",
  5: "max-md:leading-7",
  6: "max-md:leading-7",
};

const headingFontWeightClasses: Record<THeadingLevel, string> = {
  1: "font-semibold",
  2: "font-semibold",
  3: "font-semibold",
  4: "font-semibold",
  5: "font-medium",
  6: "font-medium",
};

const headingTrackingClasses: Record<THeadingLevel, string> = {
  1: "tracking-tight",
  2: "tracking-tight",
  3: "tracking-tight",
  4: "tracking-normal",
  5: "tracking-normal",
  6: "tracking-normal",
};

interface IProps
  extends ITypographyCommonProps,
    React.HTMLAttributes<HTMLHeadingElement> {
  $level?: THeadingLevel;
}

const Heading: React.FC<PropsWithChildren<IProps>> = ({
  children,
  $level = 2,
  className,
  $typographyPalette = "heading",
  $colorPalette,
  $variant,
  $textAlign,
  $fontWeight,
  ...rest
}) => {
  const classNameToUse = cn(
    headingFontSizeClasses[$level],
    headingFontSizeMobileClasses[$level],
    headingLineHeightClasses[$level],
    headingLineHeightMobileClasses[$level],
    headingFontWeightClasses[$level],
    headingTrackingClasses[$level],
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

  const HeadingElement = `h${$level || 2}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    HeadingElement,
    { className: classNameToUse, ...rest },
    children,
  );
};

export { Heading };
