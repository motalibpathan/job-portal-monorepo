import React, { PropsWithChildren } from "react";
import { ILayoutProps } from "../../types";
import { cn } from "../../utils/cn";

const DashboardLayout: React.FC<PropsWithChildren<ILayoutProps>> = ({
  children,
  isCentered,
  isDarkBackground,
  maxWidth,
}) => {
  return (
    <div
      className={
        isDarkBackground
          ? "bg-background-body-1-dark-2"
          : "bg-background-body-2-light-1"
      }
    >
      <div
        className={cn(
          "flex min-h-screen w-full flex-col px-6 py-10 sm:px-10",
          isCentered && "items-center justify-center",
        )}
        style={maxWidth ? { maxWidth } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export { DashboardLayout };
