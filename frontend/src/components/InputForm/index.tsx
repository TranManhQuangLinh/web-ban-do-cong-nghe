import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props: any) => {
  const { ...rests } = props;
  const handleOnchangeInput = (e: any) => {
    if (props.onChange) props.onChange(e.target.value);
  };
  return (
    <WrapperInputStyle
      value={props.value}
      {...rests}
      onChange={handleOnchangeInput}
    />
  );
};

export default InputForm;
