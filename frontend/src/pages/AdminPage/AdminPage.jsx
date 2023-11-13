import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import {
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarsOutlined,
  CarOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminCategory from "../../components/AdminCategory/AdminCategory";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminShippingPrice from "../../components/AdminShippingPrice/AdminShippingPrice";
import AdminOrder from "../../components/AdminOrder/AdminOrder";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "users", <UserOutlined />),
    getItem("Danh mục", "categories", <BarsOutlined />),
    getItem("Sản phẩm", "products", <ShoppingOutlined />),
    getItem("Phí giao hàng", "shipping prices", <CarOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "categories":
        return <AdminCategory />;
      case "products":
        return <AdminProduct />;
      case "shipping prices":
        return <AdminShippingPrice />;
      case "orders":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <>
      <HeaderComponent
        isHiddenSearch
        isHiddenCart
        isAdminPage
        style={{ position: "fixed", zIndex: 1000 }}
      />
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "92.8vh",
            position: "fixed",
            marginTop: "52px",
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div
          style={{
            flex: 1,
            marginLeft: "256px",
            padding: "15px 0 15px 15px",
            marginTop: "52px",
          }}
        >
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
