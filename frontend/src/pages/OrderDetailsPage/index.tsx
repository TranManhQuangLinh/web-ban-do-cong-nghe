import React, { useEffect, useState } from "react";
import {
  WrapperAllPrice,
  WrapperButtonGroup,
  WrapperContentInfo,
  WrapperCurrentStatus,
  WrapperHeaderUser,
  WrapperInfo,
  WrapperItem,
  WrapperItemLabel,
  WrapperItemOrder,
  WrapperItemPrice,
  WrapperLabel,
  WrapperStyleContent,
  WrapperStyleHeader,
  WrapperUpdateHistory,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as message from "../../components/Message";
import * as OrderService from "../../services/OrderService";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import { orderConstant } from "../../constant";
import { convertDateToString, convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import { Select } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { RootState } from "../../redux/store";
import { useGetAllUsersQuery } from "../../services/user";
import {
  useGetDetailsOrderQuery,
  useUpdateStatusMutation,
} from "../../services/order";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  // console.log(user);

  const { data: users, isLoading } = useGetAllUsersQuery();

  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching,
  } = useGetDetailsOrderQuery(id || "", { skip: !id });

  console.log("order", order);

  const [orderStatus, setOrderStatus] = useState(order?.data?.currentStatus);
  // console.log("orderStatus:", orderStatus);

  useEffect(() => {
    setOrderStatus(order?.data?.currentStatus);
  }, [order?.data?.currentStatus]);

  const handleChangeStatus = (value: string) => setOrderStatus(value);

  const [
    updateStatus,
    { data: dataUpdated, isLoading: isPendingUpdated, isSuccess },
  ] = useUpdateStatusMutation();

  useEffect(() => {
    if (isSuccess && dataUpdated?.status === "OK") {
      message.success("Cập nhật trạng thái thành công");
    } else {
      if (dataUpdated?.message) {
        message.error(dataUpdated?.message);
      }
    }
  }, [isSuccess]);

  const handleUpdateStatus = () => {
    if (id && orderStatus) {
      const data = {
        status: orderStatus,
        updater: user?._id,
        updatedAt: new Date(),
      };
      if (order?.data?.currentStatus !== orderStatus)
        updateStatus({ id: id, data: data });
      else message.warning("Mời chọn trạng thái mới");
    }
  };

  const handleCancel = () => {
    if (location?.state) {
      navigate(location?.state);
    }
  };

  return (
    <Loading isPending={isLoading || isLoadingOrder || isPendingUpdated}>
      <div style={{ width: "100%", background: "#f5f5fa" }}>
        <div
          style={{ width: "1270px", margin: "0 auto", paddingBottom: "50px" }}
        >
          <h2 style={{ padding: "10px 0" }}>Chi tiết đơn hàng</h2>
          <WrapperHeaderUser>
            <WrapperInfo>
              <WrapperLabel>Thông tin giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  <span>Tên người nhận: </span>{" "}
                  {order?.data?.shippingAddress?.recipientName}
                </div>
                <div className="address-info">
                  <span>Địa chỉ: </span> {order?.data?.shippingAddress?.address}
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span>{" "}
                  {order?.data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfo>
            <WrapperInfo>
              <WrapperLabel>Trạng thái</WrapperLabel>
              <WrapperContentInfo>
                <div className="status-info">
                  <WrapperCurrentStatus>
                    {order?.data?.currentStatus}
                  </WrapperCurrentStatus>
                </div>
              </WrapperContentInfo>
            </WrapperInfo>
            <WrapperInfo>
              <WrapperLabel>Phương thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info">
                  {order?.data?.paymentMethod
                    ? (orderConstant.payment as any)[order.data.paymentMethod]
                    : "orderConstant.payment[order.data.paymentMethod] không tồn tại"}
                </div>
              </WrapperContentInfo>
            </WrapperInfo>
          </WrapperHeaderUser>

          <WrapperStyleContent>
            <WrapperStyleHeader>
              <span
                style={{
                  display: "inline-block",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                <span>Sản phẩm</span>
              </span>
              <WrapperItemPrice>
                <span>Đơn giá</span>
                <span>Giảm giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
              </WrapperItemPrice>
            </WrapperStyleHeader>
            <div>
              {order?.data?.orderItems?.map((orderItem) => {
                return (
                  <WrapperItemOrder key={orderItem?.product}>
                    <div
                      style={{
                        width: "300px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={orderItem?.image}
                        alt=""
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textWrap: "wrap",
                        }}
                      >
                        {orderItem?.name}
                      </div>
                    </div>
                    <WrapperItemPrice>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(orderItem?.price)}
                      </span>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(
                          ((orderItem?.price * orderItem?.discount) / 100) *
                            orderItem?.quantity
                        )}
                        &nbsp;&#40;
                        <span style={{ color: "rgb(0, 171, 86)" }}>
                          {orderItem?.discount}%
                        </span>
                        &#41;
                      </span>
                      <div>{orderItem?.quantity}</div>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(
                          (orderItem?.price -
                            (orderItem?.price * orderItem.discount) / 100) *
                            orderItem?.quantity
                        )}
                      </span>
                    </WrapperItemPrice>
                  </WrapperItemOrder>
                );
              })}
            </div>
            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>
                {order?.data?.itemsPrice
                  ? convertPrice(order?.data?.itemsPrice)
                  : 0}
              </WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí giao hàng</WrapperItemLabel>
              <WrapperItem>
                {order?.data?.shippingFee
                  ? convertPrice(order?.data?.shippingFee)
                  : 0}
              </WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>
                  {order?.data?.totalPrice
                    ? convertPrice(order?.data?.totalPrice)
                    : 0}
                </WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
          {(user?.role === "Admin" || user?.role === "Nhân viên") && (
            <>
              <WrapperStyleContent>
                <WrapperInfo>
                  <WrapperLabel>Lịch sử cập nhật</WrapperLabel>
                  <WrapperContentInfo>
                    <WrapperStyleHeader>
                      <WrapperItemPrice>
                        <span>Trạng thái</span>
                        <span>Người cập nhật</span>
                        <span>Ngày cập nhật</span>
                      </WrapperItemPrice>
                    </WrapperStyleHeader>
                    <WrapperUpdateHistory>
                      {order?.data?.updateHistory?.map((item) => {
                        const updater = users?.data?.find(
                          (user) => user._id === item.updater
                        );
                        return (
                          <WrapperItemOrder key={item?.updatedAt}>
                            <WrapperItemPrice>
                              <WrapperCurrentStatus>
                                {item?.status}
                              </WrapperCurrentStatus>
                              <span
                                style={{ fontSize: "13px", color: "#242424" }}
                              >
                                {updater ? updater.name ?? updater.email : ""}
                              </span>
                              <span>
                                {convertDateToString(new Date(item?.updatedAt))}
                              </span>
                            </WrapperItemPrice>
                          </WrapperItemOrder>
                        );
                      })}
                    </WrapperUpdateHistory>
                  </WrapperContentInfo>
                </WrapperInfo>
              </WrapperStyleContent>

              <WrapperStyleContent>
                <Select
                  value={orderStatus}
                  onChange={handleChangeStatus}
                  placeholder="Thay đổi trạng thái"
                >
                  <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
                  <Select.Option value="Đang giao">Đang giao</Select.Option>
                  <Select.Option value="Đã giao">Đã giao</Select.Option>
                </Select>
                <WrapperButtonGroup>
                  <ButtonComponent
                    type="primary"
                    buttonStyle={{
                      marginBottom: "10px",
                      cursor: "pointer",
                      width: "fit-content",
                      border: "none",
                    }}
                    buttonTextStyle={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={handleUpdateStatus}
                    buttonText="Cập nhật trạng thái"
                  />
                  <ButtonComponent
                    onClick={handleCancel}
                    buttonStyle={{
                      height: "36px",
                      border: "1px solid var(--primary-color)",
                      borderRadius: "4px",
                    }}
                    buttonText={"Hủy"}
                    buttonTextStyle={{
                      color: "var(--primary-color)",
                      fontSize: "14px",
                    }}
                  />
                </WrapperButtonGroup>
              </WrapperStyleContent>
            </>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default OrderDetailsPage;
