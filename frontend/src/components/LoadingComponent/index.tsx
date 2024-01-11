import { Spin, SpinProps } from "antd";
import React, { ReactNode } from "react";

interface LoadingProps {
  children: ReactNode;
  isPending: boolean;
  delay?: number;
}

const Loading: React.FC<LoadingProps> = ({ children, isPending, delay = 200 }) => {
  return (
    <Spin spinning={isPending} delay={delay} size="large">
      {children}
    </Spin>
  );
};

export default Loading;
