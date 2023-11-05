import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textbutton,
  disabled,
  onClick,
  ...rests
}) => {
  const handleDisableOnclick = () => {};
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton.background,
        cursor: disabled ? "auto" : "pointer",
      }}
      size={size}
      onClick={disabled ? handleDisableOnclick : onClick}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  );
};

export default ButtonComponent;
