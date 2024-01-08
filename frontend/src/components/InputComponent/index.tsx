import { Input, InputProps } from 'antd';
import React, { forwardRef } from 'react';

interface InputComponentProps extends InputProps {
  // value?: string | number | readonly string[];
}

const InputComponent: React.ForwardRefRenderFunction<any, InputComponentProps> = ({ size, placeholder, bordered, style, value, ...rests }, ref) => {
  return (
    <Input
      ref={ref}
      size={size}
      placeholder={placeholder}
      bordered={bordered}
      style={style}
      value={value}
      {...rests}
    />
  );
};

export default forwardRef(InputComponent);
