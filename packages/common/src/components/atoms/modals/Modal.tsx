import { Modal as AntdModal, ModalProps } from "antd";
import React from "react";
import { cn } from "../../../utils/cn";

export interface IModalProps extends ModalProps {
  okButtonDisabled?: boolean;
}

const Modal: React.FC<IModalProps> = (props) => {
  const { okButtonProps, okButtonDisabled, className, ...rest } = props;

  return (
    <AntdModal
      {...rest}
      className={cn(
        "text-base",
        "[&_.ant-modal-content]:p-0",

        "[&_.ant-modal-header]:p-4",
        "[&_.ant-modal-header]:sm:px-6",
        "[&_.ant-modal-header]:border-b",
        "[&_.ant-modal-header]:border-borders-light-1",
        "[&_.ant-modal-header]:mb-0",

        "[&_.ant-modal-body]:p-4",
        "[&_.ant-modal-body]:sm:p-6",

        "[&_.ant-modal-footer]:p-4",
        "[&_.ant-modal-footer]:pt-2",
        "[&_.ant-modal-footer]:sm:p-6",
        "[&_.ant-modal-footer]:sm:pt-3",
        "[&_.ant-modal-footer]:mt-0",
        "[&_.ant-modal-footer]:border-t",
        "[&_.ant-modal-footer]:border-borders-light-1",

        "[&_.ant-btn]:shadow-none",
        "[&_.ant-modal-close-x]:text-2xl",
        "[&_.ant-modal-close-x]:text-typography-label-main",
        className,
      )}
      okButtonProps={{
        ...okButtonProps,
        className: cn("shadow-none", okButtonProps?.className),
        disabled: okButtonDisabled || okButtonProps?.disabled,
      }}
    >
      {props.children}
    </AntdModal>
  );
};

export default Modal;
