import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    buttonText,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColorButton = "rgb(13, 92, 182)",
    colorButton = "#fff",
  } = props;
  // <ButtonInputSearch
  //   size="large"
  //   bordered={false}
  //   buttonText="Tìm kiếm"
  //   placeholder="Tìm kiếm sản phẩm"
  //   backgroundColorButton="var(--button-search-color)"
  // />;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
      />
      <ButtonComponent
        size={size}
        buttonStyle={{
          background: backgroundColorButton,
          border: !bordered && "none",
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: "#fff" }} />}
        buttonText={buttonText}
        buttonTextStyle={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
