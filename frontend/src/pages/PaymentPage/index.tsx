import { Radio, RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import Loading from "../../components/LoadingComponent";
import * as message from "../../components/Message";
import { orderConstant } from "../../constant";
import {
  ordersSelector,
  removeAllOrderItem,
} from "../../redux/slices/OrderSlice";
import { RootState } from "../../redux/store";
import { useCreateOrderMutation } from "../../services/order";
import { convertPrice } from "../../utils";
import {
  Label,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";

const PaymentPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const orders = useSelector(ordersSelector);
  const order = orders.find((item) => item.user === user._id);
  const [paymentMethod, setPaymentMethod] =
    useState<keyof typeof orderConstant.payment>("cash_on_delivery");
  const navigate = useNavigate();
  // console.log("paymentMethod:", paymentMethod);

  const dispatch = useDispatch();
  const [
    createOrder,
    { data: dataAdded, isLoading: isPendingAddOrder, isSuccess, isError },
  ] = useCreateOrderMutation();

  const handleAddOrder = () => {
    // console.log("user:", user);
    // console.log("order:", order);
    // console.log("paymentMethod:", paymentMethod);

    if (
      order?.orderItemsSelected &&
      order?.shippingAddress.recipientName &&
      order?.shippingAddress.address &&
      order?.shippingAddress.phone &&
      paymentMethod &&
      order?.itemsPrice &&
      order?.shippingFee &&
      order?.shippingPrice &&
      order?.totalPrice &&
      order?.user
    ) {
      // call api add order
      createOrder({
        ...order,
        orderItems: order.orderItemsSelected,
        currentStatus: "Chờ xử lý",
        paymentMethod,
      });
    } else {
      message.error("Thiếu thông tin order");
      console.log({ ...order, paymentMethod });
    }
  };

  useEffect(() => {
    if (isSuccess && dataAdded?.data && dataAdded?.status === "OK") {
      const arrayOrdered: Array<string> = [];
      order?.orderItemsSelected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(
        removeAllOrderItem({ listChecked: arrayOrdered, userId: user._id })
      );
      message.success("Đặt hàng thành công");
      // console.log(dataAdded);
      navigate(`/order-details/${dataAdded.data._id}`);
    } else if (dataAdded?.status === "ERR") {
      console.log(dataAdded?.message);
      message.error(dataAdded?.message);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleChangePayment = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isPending={isPendingAddOrder}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h2 style={{ padding: "10px 0" }}>Thanh toán</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <Label>Chọn phương thức thanh toán</Label>
                <WrapperRadio
                  onChange={handleChangePayment}
                  value={paymentMethod}
                >
                  <Radio value="cash_on_delivery">
                    {" " + orderConstant.payment["cash_on_delivery"]}
                  </Radio>
                  <Radio value="online">
                    {" " + orderConstant.payment["online"]}
                  </Radio>
                </WrapperRadio>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {order?.shippingAddress?.address + " "}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {order?.itemsPrice ? convertPrice(order.itemsPrice) : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {order?.shippingFee
                        ? convertPrice(order.shippingFee)
                        : ""}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng giá</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {order?.totalPrice ? convertPrice(order.totalPrice) : ""}
                    </span>
                  </span>
                </WrapperTotal>
              </div>

              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={"small"}
                buttonStyle={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                }}
                buttonText={"Đặt hàng"}
                buttonTextStyle={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
            </WrapperRight>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default PaymentPage;
