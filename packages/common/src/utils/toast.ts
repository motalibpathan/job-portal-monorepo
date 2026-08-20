import { notification } from "antd";
import type { ArgsProps } from "antd/lib/notification/interface";

type TNotificationType = "success" | "error" | "info" | "warning";

function showNotification(
  type: TNotificationType,
  args: ArgsProps | string,
): void {
  const payload = typeof args === "string" ? { message: args } : args;
  notification[type]({
    placement: "topRight",
    duration: 4,
    ...payload,
  });
}

export const toast = {
  success: (args: ArgsProps | string) => showNotification("success", args),
  error: (args: ArgsProps | string) => showNotification("error", args),
  info: (args: ArgsProps | string) => showNotification("info", args),
  warning: (args: ArgsProps | string) => showNotification("warning", args),
};
