import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Col, Popover } from "antd";
import ButtonComponent from "components/ButtonComponent";
import InputComponent from "components/InputComponent";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "services/user";
import { initOrder, ordersSelector } from "../../redux/slices/OrderSlice";
import { resetUser } from "../../redux/slices/UserSlice";
import { searchProduct } from "../../redux/slices/productSlide";
import { RootState } from "../../redux/store";
import Loading from "../LoadingComponent";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";

const HeaderComponent = ({
  isHiddenSearch = false,
  isHiddenCart = false,
  style = {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const orders = useSelector(ordersSelector);

  const order = useMemo(() => {
    return orders.find((item) => item.user === user._id);
  }, [orders, user._id]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [logout] = useLogoutMutation()

  useEffect(() => {
    if (!order && !!user) {
      dispatch(
        initOrder({
          orderItems: [],
          orderItemsSelected: [],
          shippingAddress: { recipientName: "", address: "", phone: undefined },
          user: user._id,
          paymentMethod: "",
          itemsPrice: 0,
          shippingFee: 0,
          shippingPrice: "",
          totalPrice: 0,
          currentStatus: "",
          updateHistory: [],
        })
      );
    }
  }, [dispatch, order, user]);

  const content = () => {
    if (user._id !== "") {
      return (
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
            <WrapperContentPopup
              onClick={() => handleClickNavigate(`my-order`)}
            >
              Đơn hàng của tôi
            </WrapperContentPopup>
          )}
          <WrapperContentPopup onClick={() => handleClickNavigate("")}>
            Đăng xuất
          </WrapperContentPopup>
        </div>
      );
    }
    return (
      <WrapperContentPopup onClick={handleSignInClick}>
        Đăng nhập để sử dụng
      </WrapperContentPopup>
    );
  };

  const handleClickNavigate = (type: string) => {
    switch (type) {
      case "profile":
        navigate("/profile", { state: location?.pathname });
        setIsOpenPopover(false);
        break;
      case "admin":
        navigate("/admin");
        setIsOpenPopover(false);
        break;
      case "my-order":
        navigate("/my-order");
        setIsOpenPopover(false);
        break;
      default:
        setIsOpenPopover(false);
        handleLogout();
        navigate("/sign-in");
        break;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    logout()
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(resetUser());
    setLoading(false);
  };

  const handleSignInClick = () => {
    navigate("/sign-in", { state: location?.pathname });
  };
  const handleSignUpClick = () => {
    navigate("/sign-up");
  };
  const handleCartClick = () => {
    if (user?._id !== "") navigate("/cart");
    else handleSignInClick();
  };

  const handleSearch = (value: string) => {
    dispatch(searchProduct(value));
    if (location.pathname !== "/") navigate("/");
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
            <div style={{ display: "flex" }}>
              <InputComponent
                size='large'
                placeholder="Tìm kiếm sản phẩm"
                bordered={false}
                style={{ backgroundColor: "#fff" }}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={() => handleSearch(searchValue)}
              />
              <ButtonComponent
                size='large'
                buttonStyle={{
                  background: "rgb(13, 92, 182)",
                  border: "none",
                }}
                icon={
                  <SearchOutlined
                    color="#fff"
                    style={{ color: "#fff" }}
                  />
                }
                buttonText="Tìm kiếm"
                buttonTextStyle={{ color: "#fff" }}
                onClick={() => handleSearch(searchValue)}
              />
            </div>
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
            <Popover
              content={content}
              trigger="click"
              open={isOpenPopover}
              onOpenChange={(newOpen) => setIsOpenPopover(newOpen)}
            >
              <WrapperHeaderAccount>
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
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
                    {user?.name?.length ? user?.name : user?.email}
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <WrapperTextHeaderSmall onClick={handleSignInClick}>
                      Đăng nhập/
                    </WrapperTextHeaderSmall>
                    <WrapperTextHeaderSmall onClick={handleSignUpClick}>
                      Đăng ký
                    </WrapperTextHeaderSmall>
                  </div>
                )}
              </WrapperHeaderAccount>
            </Popover>
          </Loading>
          {!isHiddenCart && (
            <div
              onClick={handleCartClick}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "30px",
                    color: "#fff",
                    marginRight: "5px",
                  }}
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
