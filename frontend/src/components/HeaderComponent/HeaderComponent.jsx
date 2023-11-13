import React from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
import { Badge, Col, Flex, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/UserSlice";

const HeaderComponent = ({
  isHiddenSearch = false,
  isHiddenCart = false,
  isAdminPage = false,
  style
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {(user?.role === "Admin" || user?.role === "Nhân viên") && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      {user?.role === "Khách hàng" && (
        <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
          Đơn hàng của tôi
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
      if (isAdminPage) navigate("/");
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logout();
    dispatch(resetUser());
    setLoading(false);
  };

  const handleSignInClick = () => {
    navigate("/sign-in");
  };
  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  return (
    <div
      style={{
        // height: "100%",
        width: "100%",
        display: "flex",
        background: "var(--primary-color)",
        justifyContent: "center",
        ...style,
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
              buttonText="Tìm kiếm"
              placeholder="Tìm kiếm sản phẩm"
              backgroundColorButton="var(--button-search-color)"
            />
          </Col>
        )}
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Loading isPending={loading}>
            <Popover content={content} trigger="click">
              <WrapperHeaderAccount>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
                    alt="avatar"
                    style={{ width: "30px" }}
                  />
                )}
                {user?.access_token ? (
                  <div
                    style={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {userName?.length ? userName : user?.email}
                  </div>
                ) : (
                  <div>
                    <WrapperTextHeaderSmall onClick={handleSignInClick}>
                      Đăng nhập
                    </WrapperTextHeaderSmall>
                    /
                    <WrapperTextHeaderSmall onClick={handleSignUpClick}>
                      Đăng ký
                    </WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccount>
            </Popover>
          </Loading>
          {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Badge count={order?.orderItems?.length} size="small">
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
