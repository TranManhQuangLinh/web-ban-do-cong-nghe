import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarsOutlined,
  CarOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/Admin/AdminUser";
import AdminCategory from "../../components/Admin/AdminCategory";
import AdminProduct from "../../components/Admin/AdminProduct";
import AdminShippingPrice from "../../components/Admin/AdminShippingPrice/AdminShippingPrice";
import AdminOrder from "../../components/Admin/AdminOrder/AdminOrder";
import MenuComponent from "../../components/MenuComponent";

const AdminPage = () => {
  const items = [
    {
      label: <Link to={`/admin/users`}>Người dùng</Link>,
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={`/admin/categories`}>Danh mục</Link>,
      key: "categories",
      icon: <BarsOutlined />,
    },
    {
      label: <Link to={`/admin/products`}>Sản phẩm</Link>,
      key: "products",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link to={`/admin/shipping-prices`}>Phí giao hàng</Link>,
      key: "shipping-prices",
      icon: <CarOutlined />,
    },
    {
      label: <Link to={`/admin/orders`}>Đơn hàng</Link>,
      key: "orders",
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <>
      <HeaderComponent
        isHiddenSearch
        isHiddenCart
        style={{ position: "fixed", zIndex: 1000 }}
      />
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <MenuComponent
          items={items}
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "92.8vh",
            position: "fixed",
            marginTop: "52px",
          }}
        />
        <div
          style={{
            flex: 1,
            marginLeft: "256px",
            padding: "15px 0 15px 15px",
            marginTop: "52px",
          }}
        >
          <Routes>
            <Route path="users" element={<AdminUser />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="shipping-prices" element={<AdminShippingPrice />} />
            <Route path="orders" element={<AdminOrder />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
