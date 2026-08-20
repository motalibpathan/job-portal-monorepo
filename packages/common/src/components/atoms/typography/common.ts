import { cn } from "../../../utils/cn";

type TTextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";

// Common typography props
export interface ITypographyCommonProps {
  $fontWeight?: 400 | 500 | 600 | 700 | number;
  $typographyPalette?:
    | "heading"
    | "title"
    | "subtitle"
    | "paragraph"
    | "label"
    | "inverse"
    | "caption"
    | "menu";
  $colorPalette?: "primary" | "secondary" | "success" | "warning" | "danger";
  $variant?: "dark2" | "dark1" | "main" | "light1" | "light2" | "light3";
  $textAlign?: TTextAlign;
}

export const typographyFontWeightClasses: Record<number, string> = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
};

export const typographyTextAlignClasses: Record<TTextAlign, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
  justify: "text-justify",
  initial: "text-initial",
  inherit: "text-inherit",
};

const TYPOGRAPHY_PALETTE_TEXT_CLASSES: Record<string, Record<string, string>> = {
  heading: {
    dark2: "text-typography-heading-dark-2",
    dark1: "text-typography-heading-dark-1",
    main: "text-typography-heading-main",
    light1: "text-typography-heading-light-1",
    light2: "text-typography-heading-light-2",
  },
  title: {
    dark2: "text-typography-title-dark-2",
    dark1: "text-typography-title-dark-1",
    main: "text-typography-title-main",
    light1: "text-typography-title-light-1",
    light2: "text-typography-title-light-2",
  },
  subtitle: {
    dark2: "text-typography-subtitle-dark-2",
    dark1: "text-typography-subtitle-dark-1",
    main: "text-typography-subtitle-main",
    light1: "text-typography-subtitle-light-1",
    light2: "text-typography-subtitle-light-2",
  },
  paragraph: {
    dark2: "text-typography-paragraph-dark-2",
    dark1: "text-typography-paragraph-dark-1",
    main: "text-typography-paragraph-main",
    light1: "text-typography-paragraph-light-1",
    light2: "text-typography-paragraph-light-2",
  },
  label: {
    dark2: "text-typography-label-dark-2",
    dark1: "text-typography-label-dark-1",
    main: "text-typography-label-main",
    light1: "text-typography-label-light-1",
    light2: "text-typography-label-light-2",
  },
  inverse: {
    dark2: "text-typography-inverse-dark-2",
    dark1: "text-typography-inverse-dark-1",
    main: "text-typography-inverse-main",
    light1: "text-typography-inverse-light-1",
  },
  caption: {
    dark1: "text-typography-caption-dark-1",
    main: "text-typography-caption-main",
    light1: "text-typography-caption-light-1",
  },
  menu: {
    dark1: "text-typography-menu-dark-1",
    main: "text-typography-menu-main",
    light1: "text-typography-menu-light-1",
  },
};

const COLOR_PALETTE_TEXT_CLASSES: Record<string, Record<string, string>> = {
  primary: {
    dark3: "text-primary-dark-3",
    dark2: "text-primary-dark-2",
    dark1: "text-primary-dark-1",
    main: "text-primary-main",
    light1: "text-primary-light-1",
    light2: "text-primary-light-2",
    light3: "text-primary-light-3",
  },
  secondary: {
    dark3: "text-secondary-dark-3",
    dark2: "text-secondary-dark-2",
    dark1: "text-secondary-dark-1",
    main: "text-secondary-main",
    light1: "text-secondary-light-1",
    light2: "text-secondary-light-2",
    light3: "text-secondary-light-3",
  },
  success: {
    dark2: "text-success-dark-2",
    dark1: "text-success-dark-1",
    main: "text-success-main",
    light1: "text-success-light-1",
    light2: "text-success-light-2",
  },
  warning: {
    dark2: "text-warning-dark-2",
    dark1: "text-warning-dark-1",
    main: "text-warning-main",
    light1: "text-warning-light-1",
    light2: "text-warning-light-2",
  },
  danger: {
    dark2: "text-danger-dark-2",
    dark1: "text-danger-dark-1",
    main: "text-danger-main",
    light1: "text-danger-light-1",
    light2: "text-danger-light-2",
  },
};

export function getTypographyCommonClassNames(
  options: ITypographyCommonProps,
): string | undefined {
  const {
    $typographyPalette,
    $colorPalette,
    $variant = "main",
    $fontWeight,
    $textAlign,
  } = options;

  let className = "";

  if ($typographyPalette && TYPOGRAPHY_PALETTE_TEXT_CLASSES[$typographyPalette]) {
    className =
      TYPOGRAPHY_PALETTE_TEXT_CLASSES[$typographyPalette][$variant] || "";
  }

  if ($colorPalette && COLOR_PALETTE_TEXT_CLASSES[$colorPalette]) {
    className = COLOR_PALETTE_TEXT_CLASSES[$colorPalette][$variant] || "";
  }

  if ($fontWeight && typographyFontWeightClasses[$fontWeight]) {
    className += ` ${typographyFontWeightClasses[$fontWeight]}`;
  }

  if ($textAlign) {
    className += ` ${typographyTextAlignClasses[$textAlign]}`;
  }

  return cn(className) || undefined;
}
