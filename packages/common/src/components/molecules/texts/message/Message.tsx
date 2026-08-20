import { InfoCircleFilled } from "@ant-design/icons";
import React from "react";
import { cn } from "../../../../utils/cn";

interface IMyProps {
  message: string;
  className?: string;
  type: "error" | "success" | "info";
}

const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <InfoCircleFilled
    className={cn("!text-success-main mr-1 flex-shrink-0", className)}
  />
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <InfoCircleFilled
    className={cn(
      "!text-typography-paragraph-main mr-1 flex-shrink-0",
      className,
    )}
  />
);

const MESSAGE_CLASS_NAME = cn("text-xs px-[0.5em]");

const Message: React.FC<IMyProps> = (props) => {
  const { message, type, className } = props;
  return (
    <div className={cn("flex items-center", className)}>
      {type === "error" ? (
        <p className={cn(MESSAGE_CLASS_NAME, "text-danger-main")}>{message}</p>
      ) : type === "success" ? (
        <>
          <SuccessIcon />
          <p className={cn(MESSAGE_CLASS_NAME, "text-success-main")}>
            {message}
          </p>
        </>
      ) : type === "info" ? (
        <>
          <InfoIcon />
          <p
            className={cn(MESSAGE_CLASS_NAME, "text-typography-paragraph-main")}
          >
            {message}
          </p>
        </>
      ) : null}
    </div>
  );
};

export { Message };
