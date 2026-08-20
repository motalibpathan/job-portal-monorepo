import { LoadingOutlined } from "@ant-design/icons";
import { Button as AntdButton, ButtonProps } from "antd";
import { ClassValue } from "clsx";
import React, { PropsWithChildren, useMemo } from "react";
import { cn } from "../../../utils/cn";

export type TButtonType = "filled" | "outlined" | "text";
export type TButtonColor =
  | "primary"
  | "gray"
  | "success"
  | "warning"
  | "danger";

export interface IButtonProps
  extends Omit<ButtonProps, "color" | "type" | "className" | "variant"> {
  type?: TButtonType;
  color?: TButtonColor;
  loadingText?: string;
  className?: string | ClassValue;
}

const buttonFontSizeClasses: Record<string, ClassValue> = {
  large: "sm:text-[1.125rem] text-base sm:leading-[1.625rem] leading-6",
  middle: "sm:text-base text-[0.875rem] sm:leading-6 leading-[1.3125rem]",
  small:
    "sm:text-[0.875rem] text-[0.875rem] sm:leading-[1.3125rem] leading-[1.3125rem]",
};

const buttonPaddingClasses: Record<string, ClassValue> = {
  large: "py-[0.625rem] px-6",
  middle: "py-[0.625rem] px-4",
  small: "py-[0.625rem] px-4",
};

const getButtonPaddingClassName = (
  type: TButtonType = "filled",
  size: ButtonProps["size"] = "middle",
): ClassValue => {
  if (type === "text") return "p-0";
  return buttonPaddingClasses[size as string] ?? buttonPaddingClasses.middle;
};

const getButtonBackgroundColors = (
  type: TButtonType = "filled",
  color: TButtonColor = "primary",
): ClassValue => {
  if (type === "filled") {
    const backgroundFilledClasses: Record<TButtonColor, string> = {
      primary: "bg-primary-main disabled:bg-background-body-1-dark-2",
      gray: "bg-background-body-1-dark-1 disabled:bg-background-body-1-dark-2",
      success: "bg-success-main disabled:bg-background-body-1-dark-2",
      warning: "bg-warning-main disabled:bg-background-body-1-dark-2",
      danger: "bg-danger-main disabled:bg-background-body-1-dark-2",
    };
    return backgroundFilledClasses[color];
  }
  if (type === "outlined") return "bg-background-body-1-main";
  if (type === "text") return "bg-transparent";
  return "";
};

const getButtonBackgroundHoverColors = (
  type: TButtonType = "filled",
  color: TButtonColor = "primary",
): ClassValue => {
  if (type === "filled") {
    const hoverFilledClasses: Record<TButtonColor, string> = {
      primary: "hover:bg-primary-dark-1",
      gray: "hover:bg-grays-gray-3",
      success: "hover:bg-success-dark-1",
      warning: "hover:bg-warning-dark-1",
      danger: "hover:bg-danger-dark-1",
    };
    return hoverFilledClasses[color];
  }
  if (type === "outlined") {
    const hoverOutlinedClasses: Record<TButtonColor, string> = {
      primary: "hover:bg-primary-light-3",
      gray: "hover:bg-background-body-1-main",
      success: "hover:bg-success-light-2",
      warning: "hover:bg-warning-light-2",
      danger: "hover:bg-danger-light-2",
    };
    return hoverOutlinedClasses[color];
  }
  return "";
};

const getButtonBorderColor = (
  type: TButtonType = "filled",
  color: TButtonColor = "primary",
) => {
  if (type !== "outlined") return "border-none";
  const borderColorClasses: Record<TButtonColor, string> = {
    primary: "border-primary-main",
    gray: "border-borders-light-1",
    success: "border-success-main",
    warning: "border-warning-main",
    danger: "border-danger-main",
  };
  return cn("border", borderColorClasses[color], "disabled:border-borders-light-1");
};

const getButtonTextColor = (
  type: TButtonType = "filled",
  color: TButtonColor = "primary",
): ClassValue => {
  if (type === "filled") {
    return color === "gray"
      ? "text-typography-paragraph-main disabled:text-grays-gray-7"
      : "text-typography-inverse-main disabled:text-grays-gray-7";
  }
  const textColorClasses: Record<TButtonColor, string> = {
    primary: "text-primary-main",
    gray: "text-typography-paragraph-main",
    success: "text-success-main",
    warning: "text-warning-main",
    danger: "text-danger-main",
  };
  return `${textColorClasses[color]} disabled:text-grays-gray-7`;
};

const getButtonTextHoverColor = (
  type: TButtonType = "filled",
  color: TButtonColor = "primary",
): ClassValue => {
  if (type === "filled") {
    return color === "gray" ? "hover:text-primary-main" : "";
  }
  const textHoverColorClasses: Record<TButtonColor, string> = {
    primary: "hover:text-primary-dark-1",
    gray: "hover:text-primary-main",
    success: "hover:text-success-dark-1",
    warning: "hover:text-warning-dark-1",
    danger: "hover:text-danger-dark-1",
  };
  return textHoverColorClasses[color];
};

const Button: React.FC<PropsWithChildren<IButtonProps>> = (props) => {
  const {
    type = "filled",
    color = "primary",
    icon,
    size = "middle",
    loading,
    loadingText,
    disabled,
    iconPosition,
    className: passedClassName,
    ...rest
  } = props;

  const isDisabled = useMemo(
    () => Boolean(loading) || disabled,
    [disabled, loading],
  );

  const renderedIcon = useMemo(
    () => (loading ? <LoadingOutlined spin /> : icon),
    [loading, icon],
  );

  const className = cn(
    "[&_.ant-btn-icon]:!flex",
    size === "large" ? "gap-3" : size === "middle" ? "gap-2.5" : "gap-2",
    "border-0 font-medium",
    type === "text" ? "shadow-none" : "shadow-5 hover:shadow-none",
    getButtonPaddingClassName(type, size),
    getButtonBackgroundColors(type, color),
    getButtonBackgroundHoverColors(type, color),
    getButtonBorderColor(type, color),
    getButtonTextColor(type, color),
    getButtonTextHoverColor(type, color),
    buttonFontSizeClasses[size as string],
    passedClassName,
  );

  return (
    <AntdButton
      {...rest}
      iconPosition={loading ? "start" : iconPosition}
      icon={renderedIcon}
      disabled={isDisabled}
      className={className}
      size={size}
    >
      {loading ? loadingText || props.children : props.children}
    </AntdButton>
  );
};

export default Button;
