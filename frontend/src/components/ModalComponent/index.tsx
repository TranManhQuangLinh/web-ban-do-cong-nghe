import { Modal, ModalProps } from "antd";
import React, { ReactNode } from "react";

interface ModalComponentProps extends ModalProps {
  title?: string;
  isOpen?: boolean;
  children?: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title = "Modal",
  isOpen = false,
  children,
  ...rests
}) => {
  return (
    <Modal title={title} visible={isOpen} {...rests} style={{ top: "50px" }}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
