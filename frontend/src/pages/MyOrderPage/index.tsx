import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import Loading from "../../components/LoadingComponent";
import * as message from "../../components/Message";
import { RootState } from "../../redux/store";
import {
  useCancelOrderMutation,
  useGetAllUserOrdersQuery,
} from "../../services/order";
import { IOrder, IOrderItem } from "../../types";
import { convertPrice } from "../../utils";
import {
  WrapperContainer,
  WrapperCurrentStatus,
  WrapperFooterItem,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  // lấy tất cả order của user

  const { data: userOrders, isLoading: isPending } = useGetAllUserOrdersQuery(
    user._id,
    {
      skip: !(user?._id && user?.access_token),
    }
  );

  const handleDetailsOrder = (id: string) => {
    navigate(`/order-details/${id}`);
  };

  const [
    cancelOrder,
    {
      data: dataCancel,
      isLoading: isPendingCancel,
      isSuccess: isSuccessCancel,
      isError: isErrorCancel,
    },
  ] = useCancelOrderMutation();

  const handleCancelOrder = (order: IOrder) => {
    cancelOrder({
      // id: order._id,
      // orderItems: order?.orderItems,
      userId: user._id,
      data: {
        orderItems: order?.orderItems,
        orderId: order?._id,
      },
    });
  };

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success("Hủy thành công");
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancel) {
      message.error();
    }
  }, [dataCancel?.message, dataCancel?.status, isErrorCancel, isSuccessCancel]);

  const renderProduct = (data: Array<IOrderItem>) => {
    return data?.map((item) => {
      return (
        <WrapperHeaderItem key={item?._id}>
          <img
            src={item?.image}
            alt="ảnh sản phẩm"
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
              textWrap: "wrap",
              marginLeft: "10px",
            }}
          >
            {item?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            Đơn giá: {convertPrice(item?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <div
          style={{
            minHeight: "90vh",
            height: "100%",
            width: "1270px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ padding: "10px 0" }}>Đơn hàng của tôi</h2>
          <WrapperListOrder>
            {userOrders?.data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Trạng thái:{" "}
                      <WrapperCurrentStatus>
                        {order?.currentStatus}
                      </WrapperCurrentStatus>
                    </span>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Tổng giá:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        buttonStyle={{
                          height: "36px",
                          border: "1px solid var(--primary-color)",
                          borderRadius: "4px",
                        }}
                        buttonText={"Hủy đặt hàng"}
                        buttonTextStyle={{
                          color: "var(--primary-color)",
                          fontSize: "14px",
                        }}
                        disabled={order?.currentStatus !== "Chờ xử lý"}
                      />
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        buttonStyle={{
                          height: "36px",
                          border: "1px solid var(--primary-color)",
                          borderRadius: "4px",
                        }}
                        buttonText={"Xem chi tiết"}
                        buttonTextStyle={{
                          color: "var(--primary-color)",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
