import React from "react";
import {
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
import { Col } from "antd";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  return (
    <div
      style={{
        heiht: "100%",
        width: "100%",
        display: "flex",
        background: "var(--primary-color)",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <WrapperTextHeader to="/">QL SHOP</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="Tìm kiếm sản phẩm"
              backgroundColorButton="var(--button-search-color)"
            />
          </Col>
        )}
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: "30px" }} />

            <div style={{ cursor: "pointer" }}>
              <WrapperTextHeaderSmall>Đăng nhập</WrapperTextHeaderSmall>
              /
              <WrapperTextHeaderSmall>Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccout>
          {!isHiddenCart && (
            <div style={{ cursor: "pointer" }}>
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
