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
import { Badge, Col } from "antd";
import { useNavigate } from 'react-router-dom';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const handleSignInClick = () => {
    navigate('/sign-in')
  }
  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

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
          <WrapperTextHeader to="/">QL Tech</WrapperTextHeader>
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
              <WrapperTextHeaderSmall onClick={handleSignInClick}>Đăng nhập</WrapperTextHeaderSmall>/
              <WrapperTextHeaderSmall onClick={handleSignUpClick}>Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccout>
          {!isHiddenCart && (
            <div style={{ cursor: "pointer" }}>
              <Badge count={4} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
