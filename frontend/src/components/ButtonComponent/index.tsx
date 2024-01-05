import { Button, ButtonProps } from "antd";
import React from "react";

interface ButtonComponentProps extends ButtonProps {
  buttonStyle?: React.CSSProperties;
  buttonTextStyle?: React.CSSProperties;
  buttonText: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonStyle,
  buttonTextStyle,
  buttonText,
  disabled,
  onClick,
  ...rests
}) => {
  const handleDisableOnclick = () => {};

  return (
    <Button
      style={{
        ...buttonStyle,
        background: disabled ? "#ccc" : buttonStyle?.background,
        cursor: disabled ? "auto" : "pointer",
      }}
      onClick={disabled ? handleDisableOnclick : onClick}
      {...rests}
    >
      <span style={buttonTextStyle}>{buttonText}</span>
    </Button>
  );
};

export default ButtonComponent;
