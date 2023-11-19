import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderConstant } from "../../constant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import useSelection from "antd/es/table/hooks/useSelection";

const OrderDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const user = useSelection((state) => state.user);

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, user?.access_token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
  });
  const { isPending, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.quantity;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isPending={isPending}>
      <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
        <div style={{ width: "1270px", margin: "0 auto", height: "1270px" }}>
          <h2 style={{ padding: "10px 0" }}>Chi tiết đơn hàng</h2>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Thông tin giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  <span>Tên người nhận: </span>{" "}
                  {data?.shippingAddress?.recipientName}
                </div>
                <div className="address-info">
                  <span>Địa chỉ: </span>{" "}
                  {data?.shippingAddress?.address}
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Phương thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info">
                  {orderConstant.payment[data?.paymentMethod]}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "670px" }}>Sản phẩm</div>
              <WrapperItemLabel>Giá</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((order) => {
              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img
                      alt="ảnh sản phẩm"
                      src={order?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                      }}
                    >
                      Điện thoại
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem>{order?.quantity}</WrapperItem>
                  <WrapperItem>
                    {order?.discount
                      ? convertPrice((priceMemo * order?.discount) / 100)
                      : "0 VND"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí giao hàng</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default OrderDetailsPage;
